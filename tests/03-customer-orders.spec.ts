// tests/customer-orders.spec.ts
import { test, expect, request } from '@playwright/test';
import { CustomerOrdersApi,CustomerOrderDetailApi } from '../pom/03-customer-orders-api.pom';

test.describe('API: Customer Orders', () => {
  test('007 - Lấy danh sách đơn hàng theo số điện thoại theo ngày', async () => {
    const requestContext = await request.newContext();
    const ordersApi = new CustomerOrdersApi(requestContext);

    const response = await ordersApi.getCustomerOrders({
      phone: '0931431784',
      customerId: null,
      fromDate: '2024-08-25',
      toDate: '2024-11-11',
      pageSize: 110,
      pageIndex: 1,
      status: 0
    });

    const responseBody = await response.json();

    // 🧪 Kiểm tra phản hồi hợp lệ
    expect(response.status()).toBe(200);
    expect(responseBody).toBeTruthy();
    console.log('📦 Danh sách đơn hàng:', responseBody);

    // (Tuỳ theo API: kiểm tra có kết quả, đúng cấu trúc,...)
    expect(Array.isArray(responseBody.result?.items)).toBe(false);
  });
});

test.describe('API: Chi tiết đơn hàng', () => {
  test('008 - Lấy chi tiết đơn hàng theo ID', async () => {
    const requestContext = await request.newContext();
    const orderDetailApi = new CustomerOrderDetailApi(requestContext);

    const response = await orderDetailApi.getOrderDetail({
      id: 'b7a2af665ebfa3113b883add41052aad',
      phone: null,
      orderCode: null
    });

    // ✅ Kiểm tra HTTP status code
    expect(response.status()).toBe(200);

    // ✅ Parse response body
    const orderDetail = await response.json();
    console.log('📦 OrderDetail:', orderDetail);

    // ✅ Kiểm tra phản hồi thành công theo đúng cấu trúc mới
    expect(orderDetail.isSuccess).toBe(true);
    expect(orderDetail.status).toBe(200);
    expect(orderDetail.body).toBeDefined();

    // ✅ Kiểm tra chi tiết đơn hàng đúng ID
    expect(orderDetail.body.id).toBe('b7a2af665ebfa3113b883add41052aad');

    // ✅ Kiểm tra danh sách sản phẩm có ít nhất 1 sản phẩm
    expect(Array.isArray(orderDetail.body.orderDetails)).toBe(true);
    expect(orderDetail.body.orderDetails.length).toBeGreaterThan(0);

    // ✅ Kiểm tra một số thông tin cơ bản
    expect(orderDetail.body.customerName).toBeDefined();
    expect(orderDetail.body.totalAmount).toBeGreaterThan(0);
  });
});