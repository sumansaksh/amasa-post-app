export type CommentData = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};
export interface CommentFormProps {
  name: string;
  email: string;
  body: string;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setBody: (body: string) => void;
  handleSubmit: (event: React.FormEvent) => void;
}
export interface PostTableProps {
  comments: CommentData[];
  fetchData: () => void;
}