export default function Header() {
  return (
    <header className="header">
      <div className="logo">StackIt</div>
      <button className="login-btn" onClick={() => alert('Login page')}>Login</button>
    </header>
  );
}
