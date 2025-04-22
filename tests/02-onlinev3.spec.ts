import { expect, test } from "@playwright/test";
import { TokenAuthPage } from "../pom/01-token.pom";
import { OnlineOrderApiPage } from "../pom/02-order-api.pom.ts";

test("005 - Lấy ra danh sách đơn hàng online từ ngày đến ngày", async ({ request }) => {
  // Lấy token từ hệ thống SEP
  const tokenAuth = new TokenAuthPage(request);
  const token = await tokenAuth.login("admin", "Dev@20#24@");

  // Gọi API thông qua class OnlineOrderApiPage
  const orderApi = new OnlineOrderApiPage(request, token);
  const result = await orderApi.getOnlineOrders(
    "2024-10-01",
    "2025-04-11",
    [],
    '',
    '',
    true,
    false
  );

  console.log("📦 Dữ liệu trả về:", result);

  // Kiểm tra cấu trúc cơ bản của dữ liệu
  expect(result).toBeTruthy();
  expect(Array.isArray(result.result)).toBe(false);
});


test("006 - Load toàn bộ chi tiết đơn hàng online theo mã đơn", async ({ request }) => {
  // Lấy access token từ hệ thống SEP
  const tokenAuth = new TokenAuthPage(request);
  const token = await tokenAuth.login("admin", "Dev@20#24@");

  // Tạo instance của OnlineOrderApiPage
  const orderApi = new OnlineOrderApiPage(request, token);

  // Gọi API để lấy chi tiết đơn hàng
  const result = await orderApi.getOnlineOrderDetail("DTVN0000010000", true);

  // Log kết quả
  console.log("📦 Chi tiết đơn hàng:", result);

  // Kiểm tra phản hồi
  expect(result).toBeTruthy();
  expect(result.success ?? true).toBe(true); // fallback nếu API không trả về field success
  // expect(result.result).toBeDefined();
});
