interface Params {
  children: React.ReactNode
}

function App({children}:Params) {
  return (
    <main className=" min-h-screen items-center justify-center">
      {children}
    </main>
  );
}

export default App;
