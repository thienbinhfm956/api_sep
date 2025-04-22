// pom/logistics-onwheel-api.pom.ts
import { APIRequestContext, APIResponse } from '@playwright/test';

export class LogisticsOnWheelApi {
  constructor(private request: APIRequestContext) {}

  async getOnWheelList(): Promise<APIResponse> {
    const headers = {
      'User-Agent': 'QC-TEST',
      'X-Sep-RequestId': 'bf9c93d9-4266-458c-9ea0-403c59fe7929',
      'X-Sep-RequestDate': '2025-04-15T17:13:00',
      'X-Sep-ClientId': 'CPS-WEB',
      'X-Sep-Signature': 'A8kUBeOs4Br1GcWABFF78Z1yiHHCewN1wNPzHE57NIg=',
      'Content-Type': 'application/json',
      'X-Sep-User': JSON.stringify({
        CenterId: 12869,
        BranchId: 101,
        UserId: 1001,
        UserName: 'john.doe',
        UserTitleId: 2,
        AppId: 'YourAppId1',
        SeassonId: 'bf9c93d9-4266-458c-9ea0-403c59fe7929'
      })
    };

    const body = {
      FromDate: '2025-04-01T00:00:00',
      ToDate: '2025-04-15T23:59:09.8184918+07:00',
      BranchIds: [139, 182],
      Phone: '',
      OWOrderCode: '',
      AutoCode: '',
      Status: 'ALL'
    };

    return await this.request.post(
      'https://dev.api.cps.onl/8661ace9-74b3-4223-8c74-9434c7bdb82f/logistic/v1/onwheel/list',
      { headers, data: body }
    );
  }
}

export class CreateOnWheelApi {
    constructor(private request: APIRequestContext) {}
  
    async createOnWheelOrder(): Promise<APIResponse> {
      const headers = {
        'User-Agent': 'QC-TEST',
        'X-Sep-RequestId': 'bf9c93d9-4266-458c-9ea0-403c59fe7929',
        'X-Sep-RequestDate': '2025-12-31T10:13:00',
        'X-Sep-ClientId': 'CPS-WEB',
        'X-Sep-Signature': 'A8kUBeOs4Br1GcWABFF78Z1yiHHCewN1wNPzHE57NIg=',
        'Content-Type': 'application/json',
        'X-Sep-User': JSON.stringify({
          CenterId: 12869,
          BranchId: 101,
          UserId: 1001,
          UserName: 'john.doe',
          UserTitleId: 2,
          AppId: 'YourAppId1',
          SeassonId: 'bf9c93d9-4266-458c-9ea0-403c59fe7929'
        })
      };
  
      const body = {
        RequestId: '1c78724c-7485-44ae-8ae2-a5c5c92d2d9a',
        PartnerOrderNo: null,
        BranchId: 139,
        ContactPhone: '0919792729',
        ContactName: 'A Chuẩn',
        ContactAddress: '41/32/21 Gò Cát',
        Address: {
          ProvinceId: 30,
          ProvinceName: 'TP HCM',
          DistrictId: 9,
          DistrictName: 'Tp Thủ Đức',
          WardId: 4562,
          WardName: 'P Phú Hữu'
        },
        Details: [
          {
            Index: 0,
            AutoCode: 'SP.134NTH.25.03.000324',
            TotalAmount: 7290000,
            CodAmount: 4290000,
            Deadline: '2025-01-06T14:15:22Z',
            ContactPhone: '0932174996',
            ContactName: 'Anh Quyền Chí Long',
            ContactAddress: '25 Nguyễn Văn Vỹ, P.12, Q. Tân Bình, HCM',
            Notes: 'Giao hàng trước: 15/03/2025 17:08',
            Address: {
              ProvinceId: 30,
              ProvinceName: 'TP Hồ Chí Minh',
              DistrictId: 1,
              DistrictName: 'Q. Tân Bình',
              WardId: 4524,
              WardName: 'P.12'
            }
          }
        ]
      };
  
      return await this.request.post(
        'https://dev.api.cps.onl/8661ace9-74b3-4223-8c74-9434c7bdb82f/logistic/v1/onwheel',
        { headers, data: body }
      );
    }
  }

  export class UpdateOnWheelStatusApi {
    constructor(private request: APIRequestContext) {}
  
    async updateStatus(deliveryNo: string): Promise<APIResponse> {
      const headers = {
        'User-Agent': 'QC-TEST',
        'X-Sep-RequestId': 'bf9c93d9-4266-458c-9ea0-403c59fe7929',
        'X-Sep-RequestDate': '2025-12-31T09:53:00',
        'X-Sep-ClientId': 'CPS-WEB',
        'X-Sep-Signature': 'A8kUBeOs4Br1GcWABFF78Z1yiHHCewN1wNPzHE57NIg=',
        'Content-Type': 'application/json',
        'X-Sep-User': JSON.stringify({
          CenterId: 12869,
          BranchId: 101,
          UserId: 1001,
          UserName: 'john.doe',
          UserTitleId: 2,
          AppId: 'YourAppId1',
          SeassonId: 'bf9c93d9-4266-458c-9ea0-403c59fe7929'
        })
      };
  
      const url = `https://dev.api.cps.onl/8661ace9-74b3-4223-8c74-9434c7bdb82f/logistic/v1/onwheel/update-status/${deliveryNo}`;
  
      return await this.request.post(url, { headers });
    }
  }

  export class CheckShipmentMergeApi {
    constructor(private request: APIRequestContext) {}
  
    async checkCanMerge(): Promise<APIResponse> {
      const headers = {
        'User-Agent': 'QC-TEST',
        'X-Sep-RequestId': 'bf9c93d9-4266-458c-9ea0-403c59fe7929',
        'X-Sep-RequestDate': '2025-12-31T13:41:00',
        'X-Sep-ClientId': 'CPS-WEB',
        'X-Sep-Signature': 'A8kUBeOs4Br1GcWABFF78Z1yiHHCewN1wNPzHE57NIg=',
        'Content-Type': 'application/json',
        'X-Sep-User': JSON.stringify({
          CenterId: 12869,
          BranchId: 101,
          UserId: 1001,
          UserName: 'john.doe',
          UserTitleId: 2,
          AppId: 'YourAppId1',
          SeassonId: 'bf9c93d9-4266-458c-9ea0-403c59fe7929'
        })
      };
  
      const body = {
        Addresses: [
          "134 Nguyễn Thái Học, Phạm Ngũ Lão, Q.1, TP HCM",
          "25 Nguyễn Văn Vỹ, P.12, Q. Tân Bình, HCM"
        ]
      };
  
      const url = `https://dev.api.cps.onl/8661ace9-74b3-4223-8c74-9434c7bdb82f/logistic/v1/onwheel/check-shipment-can-merge`;
  
      return await this.request.post(url, {
        headers,
        data: body
      });
    }
  }