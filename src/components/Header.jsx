import logoImg from "../assets/logo.jpg";

export default function Header() {
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="logo" />

        <h1>Food Shop</h1>
      </div>
      <nvv>
        <button>Cart()</button>
      </nvv>
    </header>
  );
}
