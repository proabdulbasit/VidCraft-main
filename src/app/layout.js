import './globals.css';
import { Inter } from 'next/font/google';
import SupabaseProvider from './supabase-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'MediaCraft',
  description: 'Video creation tool powered with AI.',
};

export default function RootLayout({ children }) {
  console.log(inter);
  return (
    <html lang='en' className='h-full'>
      <body className='min-h-full flex flex-col'>
        <SupabaseProvider>{children}</SupabaseProvider>
      </body>
    </html>
  );
}
// sb-mnaguxyvcgwbzuykozfh-auth-token
// {"provider_token":"ya29.a0AfB_byD6PFrGTT5eq-25xm8WoISYlkbqnCT5twFBKThqPtxNfp4dWmy2tlZr90eGp2ekAUHgcL8SE9W62pe3lyIawf4rnLofTUx3w_jM_Edw9sMOfpfeY1FQdFWzheaXOr7bAmJe3viARbYeCOVChohlNTsUGP5JwWH7aCgYKATkSARESFQGOcNnC68L_HsNmiQXOlQJMmsb-pA0171","access_token":"eyJhbGciOiJIUzI1NiIsImtpZCI6IjlFdytWdFhTTlArWStRcXYiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjk4MTgyMDM3LCJpYXQiOjE2OTgxNzg0MzcsImlzcyI6Imh0dHBzOi8vbW5hZ3V4eXZjZ3dienV5a296Zmguc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6IjA5Zjc5MzVkLTkwZDktNGZlYS05ZjI4LTI4YTc2YjRiNTU0NSIsImVtYWlsIjoicmFtaXJvZXN0ZXZlejk2QGdtYWlsLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZ29vZ2xlIiwicHJvdmlkZXJzIjpbImdvb2dsZSJdfSwidXNlcl9tZXRhZGF0YSI6eyJhdmF0YXJfdXJsIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSmh6ckM1RW5Nb1U5UElKU0t1eFJtRDUwUkJ5LVFySGR6TTVkcjZJRExqR29rPXM5Ni1jIiwiZW1haWwiOiJyYW1pcm9lc3RldmV6OTZAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZ1bGxfbmFtZSI6IlJhbWlybyBFc3RldmV6IiwiaXNzIjoiaHR0cHM6Ly9hY2NvdW50cy5nb29nbGUuY29tIiwibmFtZSI6IlJhbWlybyBFc3RldmV6IiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0poenJDNUVuTW9VOVBJSlNLdXhSbUQ1MFJCeS1Rckhkek01ZHI2SURMakdvaz1zOTYtYyIsInByb3ZpZGVyX2lkIjoiMTAyNTIyODAxODg2NDYzOTEwMzU0Iiwic3ViIjoiMTAyNTIyODAxODg2NDYzOTEwMzU0In0sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoib2F1dGgiLCJ0aW1lc3RhbXAiOjE2OTgxNzg0Mzd9XSwic2Vzc2lvbl9pZCI6IjE2NTQyZmM4LTQ1N2EtNGYzMC04MWU5LWM4MzQ0ODUzMmZjZiJ9.u7ZBqOShUotr4O1WF86hPApI3sghpE59JR4BFvpBgyU","expires_in":3600,"expires_at":1698182037,"refresh_token":"dqWyh7p3NltP4bAgz7442A","token_type":"bearer","user":{"id":"09f7935d-90d9-4fea-9f28-28a76b4b5545","aud":"authenticated","role":"authenticated","email":"ramiroestevez96@gmail.com","email_confirmed_at":"2023-09-12T04:49:34.807417Z","phone":"","confirmed_at":"2023-09-12T04:49:34.807417Z","last_sign_in_at":"2023-10-24T20:13:57.366629Z","app_metadata":{"provider":"google","providers":["google"]},"user_metadata":{"avatar_url":"https://lh3.googleusercontent.com/a/ACg8ocJhzrC5EnMoU9PIJSKuxRmD50RBy-QrHdzM5dr6IDLjGok=s96-c","email":"ramiroestevez96@gmail.com","email_verified":true,"full_name":"Ramiro Estevez","iss":"https://accounts.google.com","name":"Ramiro Estevez","picture":"https://lh3.googleusercontent.com/a/ACg8ocJhzrC5EnMoU9PIJSKuxRmD50RBy-QrHdzM5dr6IDLjGok=s96-c","provider_id":"102522801886463910354","sub":"102522801886463910354"},"identities":[{"id":"102522801886463910354","user_id":"09f7935d-90d9-4fea-9f28-28a76b4b5545","identity_data":{"avatar_url":"https://lh3.googleusercontent.com/a/ACg8ocJhzrC5EnMoU9PIJSKuxRmD50RBy-QrHdzM5dr6IDLjGok=s96-c","email":"ramiroestevez96@gmail.com","email_verified":true,"full_name":"Ramiro Estevez","iss":"https://accounts.google.com","name":"Ramiro Estevez","picture":"https://lh3.googleusercontent.com/a/ACg8ocJhzrC5EnMoU9PIJSKuxRmD50RBy-QrHdzM5dr6IDLjGok=s96-c","provider_id":"102522801886463910354","sub":"102522801886463910354"},"provider":"google","last_sign_in_at":"2023-09-12T04:49:34.804919Z","created_at":"2023-09-12T04:49:34.804966Z","updated_at":"2023-10-24T20:13:57.363887Z"}],"created_at":"2023-09-12T04:49:34.798381Z","updated_at":"2023-10-24T20:13:57.368948Z"}}
