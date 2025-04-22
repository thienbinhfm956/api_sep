import { APIRequestContext, APIResponse } from '@playwright/test';

export class CustomerOrdersApi {
  constructor(private request: APIRequestContext) {}

  async getCustomerOrders(body: {
    phone: string;
    customerId: string | null;
    fromDate: string;
    toDate: string;
    pageSize: number;
    pageIndex: number;
    status: number;
  }): Promise<APIResponse> {
    const response = await this.request.post(
      'https://dev.api.cps.onl/customer/v2/Customer/Orders',
      {
        headers: {
          'User-Agent': 'QC-TEST',
          'X-Sep-RequestId': 'bf9c93d9-4266-458c-9ea0-403c59fe7929',
          'X-Sep-RequestDate': '2024-08-23',
          'X-Sep-ClientId': 'SEP.DEV',
          'X-Sep-Signature': 'aaaa',
          'Content-Type': 'application/json',
        },
        data: body,
      }
    );

    return response;
  }
}
export class CustomerOrderDetailApi {
  constructor(private request: APIRequestContext) {}

  async getOrderDetail(body: {
    id: string;
    phone: string | null;
    orderCode: string | null;
  }): Promise<APIResponse> {
    const response = await this.request.post(
      'https://dev.api.cps.onl/customer/v2/Customer/OrderDetail',
      {
        headers: {
          'User-Agent': 'QC-TEST',
          'X-Sep-RequestId': 'bf9c93d9-4266-458c-9ea0-403c59fe7929',
          'X-Sep-RequestDate': '2024-09-30 18:26:00',
          'X-Sep-ClientId': 'CPS-WEB',
          'X-Sep-Signature': 'A8kUBeOs4Br1GcWABFF78Z1yiHHCewN1wNPzHE57NIg=',
          'Content-Type': 'application/json'
        },
        data: body
      }
    );

    return response;
  }
}
