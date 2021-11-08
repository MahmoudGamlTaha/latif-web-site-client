
export interface BasicResponse {
    message: string | undefined;
    msg: string | undefined;
    response: { [key: string]: any; } | undefined;
    success: boolean | undefined;
}