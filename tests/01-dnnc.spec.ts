import { expect, test } from "@playwright/test";
import { TokenAuthPage } from "../pom/01-token.pom";
import { OldImportApiPage } from "../pom/01-token.pom";

test("001 - Đăng nhập thành công vào SEP", async ({ request }) => {
    const tokenAuth = new TokenAuthPage(request);

    const accessToken = await tokenAuth.login("admin", "Dev@20#24@");

    console.log("✅ AccessToken nhận được:", accessToken);

    // ✅ Kiểm tra token tồn tại và là chuỗi
    expect(accessToken).toBeTruthy();
    expect(typeof accessToken).toBe("string");
    expect(accessToken.length).toBeGreaterThan(10); // kiểm tra token không bị rỗng
});

test("002 - Load toàn bộ trạng thái - Danh sách đề nghị nhập cũ", async ({ request }) => {
    const auth = new TokenAuthPage(request);
    const token = await auth.login("admin", "Dev@20#24@");

    const oldImport = new OldImportApiPage(request, token);
    const result = await oldImport.getAppLoadStatuses(12869);

    console.log("✅ Kết quả toàn bộ trạng thái đề nghị nhập cũ:", result);

    // ✅ Xác minh
    expect(result).toBeTruthy();
    expect(Array.isArray(result.result)).toBe(true);
});

test("003 - Lấy ra toàn bộ DNNC từ ngày đến ngày tạo thành công với trạng thái khởi tạo", async ({ request }) => {
    // Đăng nhập lấy token
    const tokenPage = new TokenAuthPage(request);
    const token = await tokenPage.login("admin", "Dev@20#24@");

    // Gọi API AppLoadList
    const importPage = new OldImportApiPage(request, token);

    const result = await importPage.getAppLoadList(
        12869,           // centerId
        [139],           // branchIds
        [1],             // statusIds
        "2024/01/01",    // fromDate
        "2025/03/28"     // toDate
    );

    console.log("✅ Các DNNC từ ngày 01-01-2024 đến ngày 28-03-2025 tạo thành công với trạng thái khởi tạo", result);

    // ✅ Kiểm tra dữ liệu trả về
    expect(result).toBeTruthy();
    expect(Array.isArray(result.result)).toBe(true);
});

test("004 - Lấy ra 1 Đề nghị nhập cũ có thông tin chi tiết với RequestId bất kì ", async ({ request }) => {
    const tokenPage = new TokenAuthPage(request);
    const token = await tokenPage.login("admin", "Dev@20#24@");

    const importPage = new OldImportApiPage(request, token);

    // Get DS DNNC có trạng thái khởi tạo để lấy danh sách requestId
    const listResult = await importPage.getAppLoadList(
        12869,        // centerId
        [139],        // branchIds
        [1],          // statusIds
        "2024/01/01", // fromDate
        "2024/12/31"  // toDate
    );

    const list = listResult.result;

    // Kiểm tra danh sách
    expect(Array.isArray(list)).toBe(true);
    expect(list.length).toBeGreaterThan(0);

    console.log("📋 In ra thông tin mẫu 1 đề nghị nhập cũ :", list.slice(0, 1)); // in mẫu phần tử đầu tiên

    // Chọn random 1 phần tử
    const randomIndex = Math.floor(Math.random() * list.length);
    const chosenItem = list[randomIndex];

    // Dùng fallback để lấy requestId
    const requestId = chosenItem?.id || chosenItem?.requestId;

    // Kiểm tra requestId hợp lệ
    expect(requestId).toBeDefined();
    expect(typeof requestId).toBe("number");
    expect(requestId).toBeGreaterThan(0);

    console.log("🎯 RequestId được chọn ngẫu nhiên:", requestId);

    // Lấy 1 DNNC theo requestId random
    const detailResult = await importPage.getAppLoadDetail(requestId, 12869, true);

    console.log("✅ Chi tiết AppLoadDetail:", detailResult);

    // ✅ Xác minh kết quả
    expect(detailResult).toBeTruthy();
    expect(detailResult.success).toBe(true);
    expect(detailResult.result).toBeDefined();
});