import { FormularioRegistro } from "@/components/auth/registerCard";
import logo from "@/assets/logo.svg";

export function Register() {
  return (
    <div className="single-page">
      <div className="w-1/3 max-w-1/2 flex-col text-center">
        <h1 className="text-4xl font-semibold">Mis finanzas</h1>
        <img src={logo} alt="LogoApp" className="" />
      </div>
      <FormularioRegistro />
    </div>
  );
}

export default Register;
