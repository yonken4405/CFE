interface User {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'dods' | 'dean' | 'faculty';
}
