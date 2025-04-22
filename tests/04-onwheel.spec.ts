// tests/logistics-onwheel.spec.ts
import { test, expect, request } from '@playwright/test';
import { LogisticsOnWheelApi,CreateOnWheelApi,UpdateOnWheelStatusApi,CheckShipmentMergeApi } from '../pom/04-onwheel.pom';

test.describe('API: OnWheel - Danh sách đơn đang giao', () => {
  test('009 - Lấy toàn bộ danh sách đơn hàng OnWheel theo ngày và branch', async () => {
    const context = await request.newContext();
    const logisticsApi = new LogisticsOnWheelApi(context);

    const response = await logisticsApi.getOnWheelList();
    const json = await response.json();

    console.log('📦 Kết quả trả về:', json);

    // ✅ Kiểm tra HTTP status code
    expect(response.status()).toBe(200);

    // ✅ Kiểm tra response body chuẩn
    expect(json).toHaveProperty('IsSuccess', true);
    expect(json).toHaveProperty('HttpStatusCode', 200);
    expect(json).toHaveProperty('Data');
    expect(Array.isArray(json.Data)).toBe(true);
    expect(json.Data.length).toBeGreaterThan(0);

    // ✅ Kiểm tra một phần tử trong mảng
    const item = json.Data[0];
    expect(item).toHaveProperty('DeliveryNo');
    expect(item).toHaveProperty('AutoCode');
    expect(item).toHaveProperty('Status');
    expect(['ASSIGNING', 'COMPLETED', 'CANCELLED', 'ACCEPTED']).toContain(item.Status);
  });
});

test.describe('API: Tạo đơn hàng giao OnWheel', () => {
  test('010 - Tạo đơn giao hàng OnWheel thành công', async () => {
    const requestContext = await request.newContext();
    const createApi = new CreateOnWheelApi(requestContext);

    const response = await createApi.createOnWheelOrder();
    const json = await response.json();

    console.log('📦 Kết quả tạo đơn:', json);

    // ✅ Kiểm tra phản hồi thành công
    expect(response.status()).toBe(200);
    expect(json).toHaveProperty('IsSuccess', true);
    expect(json).toHaveProperty('HttpStatusCode', 200);
    expect(json.Error).toBeNull();
    expect(json.Data).toBeNull(); // Vì Data = null khi tạo thành công
  });
});

test.describe('API: Cập nhật trạng thái vận đơn OnWheel', () => {
  test('011 - Cập nhật trạng thái thành công với mã vận đơn hợp lệ', async () => {
    const requestContext = await request.newContext();
    const api = new UpdateOnWheelStatusApi(requestContext);

    const deliveryNo = '25G7QHLV'; // 🔁 Mã vận đơn thật từ môi trường
    const response = await api.updateStatus(deliveryNo);

    expect(response.status()).toBe(200);

    const body = await response.json();
    console.log('📦 Response JSON:', body);

    // ✅ Kiểm tra nội dung JSON đúng định dạng và giá trị
    expect(body).toMatchObject({
      HttpStatusCode: 200,
      IsSuccess: true,
      Message: 'Lấy thông tin vận đơn thành công!',
      Data: false,
      Error: null
    });
  });
});

test.describe('API: Kiểm tra có thể gộp đơn giao không', () => {
  test('012 - Lấy toàn bộ Danh sách đơn có thể ghép chuyến OnWheel', async () => {
    const requestContext = await request.newContext();
    const api = new CheckShipmentMergeApi(requestContext);

    const response = await api.checkCanMerge();
    expect(response.status()).toBe(200);

    const result = await response.json();
    console.log('📦 Merge Check Response:', result);

    // ✅ Kiểm tra phản hồi hợp lệ
    expect(result).toMatchObject({
      HttpStatusCode: 200,
      IsSuccess: true,
      Error: null
    });

    // ✅ Kiểm tra danh sách trả về có ít nhất 1 đơn
    expect(Array.isArray(result.Data)).toBe(true);
    expect(result.Data.length).toBeGreaterThan(0);

    // ✅ Kiểm tra 1 đơn trong danh sách có đầy đủ thông tin
    const sample = result.Data[0];
    expect(sample).toHaveProperty('OrderId');
    expect(sample).toHaveProperty('Distance');
    expect(sample).toHaveProperty('DriverName');
    expect(sample).toHaveProperty('Ratio');
  });
});