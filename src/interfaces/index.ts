export interface ITransaction {
  id: number;
  user_id: number;
  category_id: number;
  category_description: string;
  card_id: number;
  description: string;
  date: Date;
  type_id: number;
  value: number;
  installments: number;
  created_at: Date;
  updated_at: Date;
}
