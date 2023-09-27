export interface ITransaction {
  id: number;
  user_id: number;
  category_id: number;
  category_description: string;
  card_id: number;
  transaction_description: string;
  date: Date;
  type_id: number;
  transaction_value: number;
  installments: number;
  created_at: Date;
  updated_at: Date;
}

export interface Card {
  best_day: number;
  created_at: Date;
  card_description: string;
  expiration: number;
  flag_id: number;
  id: number;
  updated_at: Date;
  user_id: number;
}
