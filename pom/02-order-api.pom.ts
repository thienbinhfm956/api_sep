import { APIRequestContext } from "@playwright/test";

export class OnlineOrderApiPage {
  request: APIRequestContext;
  token: string;

  constructor(request: APIRequestContext, token: string) {
    this.request = request;
    this.token = token;
  }

  async getOnlineOrders(
    fromDate: string,
    toDate: string,
    branchIds: number[],
    phone: string,
    orderCode: string,
    isPending: boolean,
    isDiscountOnlOrder: boolean
  ) {
    const response = await this.request.post(
      'https://dev.api.cps.onl/posretail/v1/order/onlines',
      {
        headers: {
          'X-Sep-User': JSON.stringify({
            CenterId: 1,
            BranchId: 101,
            UserId: 1001,
            UserName: 'john.doe',
            UserTitleId: 2,
            AppId: 'YourAppId1',
            SeassonId: 'Session123'
          }),
          'User-Agent': 'QC-TEST',
          'X-Sep-RequestId': 'bf9c93d9-4266-458c-9ea0-403c59fe7929',
          'X-Sep-RequestDate': '2025-04-11T09:56:00',
          'X-Sep-ClientId': 'CPS-WEB',
          'X-Sep-Signature': 'A8kUBeOs4Br1GcWABFF78Z1yiHHCewN1wNPzHE57NIg=',
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        },
        data: {
          FromDate: fromDate,
          ToDate: toDate,
          BranchIds: branchIds,
          Phone: phone,
          OrderCode: orderCode,
          IsPending: isPending,
          IsDiscountOnlOrder: isDiscountOnlOrder
        }
      }
    );

    if (response.status() !== 200) {
      throw new Error(`Lỗi khi gọi API getOnlineOrders: ${response.status()} - ${await response.text()}`);
    }

    return await response.json();
  }
  async getOnlineOrderDetail(orderCode: string, isCare: boolean) {
    const response = await this.request.get(
      `https://dev.api.cps.onl/posretail/v1/order/online/${orderCode}?isCare=${isCare}`,
      {
        headers: this.buildHeaders()
      }
    );

    if (response.status() !== 200) {
      throw new Error(`Lỗi khi gọi API getOnlineOrderDetail: ${response.status()} - ${await response.text()}`);
    }

    return await response.json();
  }

  private buildHeaders() {
    return {
      'X-Sep-User': JSON.stringify({
        CenterId: 1,
        BranchId: 101,
        UserId: 1001,
        UserName: 'john.doe',
        UserTitleId: 2,
        AppId: 'YourAppId1',
        SeassonId: 'Session123'
      }),
      'User-Agent': 'QC-TEST',
      'X-Sep-RequestId': 'bf9c93d9-4266-458c-9ea0-403c59fe7929',
      'X-Sep-RequestDate': '2025-04-11T16:00:01',
      'X-Sep-ClientId': 'CPS-WEB',
      'X-Sep-Signature': 'A8kUBeOs4Br1GcWABFF78Z1yiHHCewN1wNPzHE57NIg=',
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    };
  }
}