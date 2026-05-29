import { FormularioLogin } from "@/components/auth/loginCard";
import logo from "@/assets/logo.svg";

function Login() {
  return (
    <div className="single-page">
      <div className="w-1/3 w-max-1/2 flex-col text-center">
        <h1 className="text-4xl font-semibold">Mis finanzas</h1>
        <img src={logo} alt="LogoApp" className="" />
      </div>
      <FormularioLogin />
    </div>
  );
}

export default Login;
