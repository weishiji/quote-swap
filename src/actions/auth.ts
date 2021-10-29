type TRecaptchaProvider = 'google' | 'tencent';
// 机构申请
export interface IInstitutionAccountForm {
  captchaResponse: string;
  firstName: string;
  lastName: string;
  country: string;
  email: string;
  policy: boolean;
  institutionName: string;
  institutionType: number;
  recaptchaProvider: TRecaptchaProvider;
}

export interface IInstitutionAccountOutput {
  createdAt: number;
  updatedAt: number;
  id: string;
  accountType: 'INSTITUTION';
  firstName: string;
  lastName: string;
  country: string;
  email: string;
  institutionName: string;
  institutionType: string;
  status: string;
  reviewerId?: string | number;
  note?: string;
}
