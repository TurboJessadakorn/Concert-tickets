interface HomeProps {
  isAdmin: boolean;
}

export default function Home({ isAdmin }: HomeProps) {
  return (
    <div className="sm:pl-64 pl-12 py-12 pr-12">
      {isAdmin ? (
        <>
         Admin
        </>
      ) : (
        <>
        User
        </>
      )}
    </div>
  );
}
