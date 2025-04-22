import { APIRequestContext } from "@playwright/test";

export class TokenAuthPage {
    request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async login(username: string, password: string): Promise<string> {
        const response = await this.request.post(
            'https://uat-app.cps.onl/api/TokenAuth/Authenticate',
            {
                headers: {
                    'accept': 'text/plain',
                    'Content-Type': 'application/json-patch+json',
                    'X-XSRF-TOKEN': 'null'
                },
                data: {
                    userNameOrEmailAddress: username,
                    password: password
                }
            }
        );

        if (response.status() !== 200) {
            throw new Error(`Login failed: ${response.status()} - ${await response.text()}`);
        }

        const json = await response.json();
        return json.result.accessToken;
    }
}

export class OldImportApiPage {
    request: APIRequestContext;
    token: string;

    constructor(request: APIRequestContext, token: string) {
        this.request = request;
        this.token = token;
    }

    async getAppLoadStatuses(centerId: number) {
        const response = await this.request.get(
            `https://uat-app.cps.onl/api/services/app/OldImportReq/AppLoadStatuses?centerId=${centerId}`,
            {
                headers: {
                    'accept': 'text/plain',
                    'Authorization': `Bearer ${this.token}`,
                    'X-XSRF-TOKEN': this.token // YC them token 
                }
            }
        );

        if (response.status() !== 200) {
            throw new Error(`Lỗi khi gọi API: ${response.status()} - ${await response.text()}`);
        }

        return await response.json();
    }

    async getAppLoadList(
        centerId: number,
        branchIds: number[],
        statusIds: number[],
        fromDate: string,
        toDate: string
    ) {
        const response = await this.request.post(
            'https://uat-app.cps.onl/api/services/app/OldImportReq/AppLoadList',
            {
                headers: {
                    'accept': 'text/plain',
                    'Content-Type': 'application/json-patch+json',
                    'Authorization': `Bearer ${this.token}`,
                    'X-XSRF-TOKEN': this.token
                },
                data: {
                    centerId,
                    branchIds,
                    statusIds,
                    fromDate,
                    toDate
                }
            }
        );

        if (response.status() !== 200) {
            throw new Error(`Lỗi khi gọi AppLoadList: ${response.status()} - ${await response.text()}`);
        }

        const result = await response.json();
        return result;
    }

    async getAppLoadDetail(requestId: number, centerId: number, editPermission: boolean) {
        const response = await this.request.post(
            'https://uat-app.cps.onl/api/services/app/OldImportReq/AppLoadDetail',
            {
                headers: {
                    'accept': 'text/plain',
                    'Content-Type': 'application/json-patch+json',
                    'Authorization': `Bearer ${this.token}`,
                    'X-XSRF-TOKEN': this.token
                },
                data: {
                    requestId,
                    centerId,
                    editPermission
                }
            }
        );

        if (response.status() !== 200) {
            throw new Error(`Lỗi khi gọi AppLoadDetail: ${response.status()} - ${await response.text()}`);
        }

        const result = await response.json();
        return result;
    }

}



