import logo from "@/assets/logo.svg";
import VerificarEmailCard from "@/components/auth/verificarEmailCard";
function VerificarEmail() {
  return (
    <div className="single-page">
      <div className="w-1/3 w-max-1/2 flex-col text-center">
        <h1 className="text-4xl font-semibold">Mis finanzas</h1>
        <img src={logo} alt="LogoApp" className="" />
      </div>
      <VerificarEmailCard />
    </div>
  );
}

export default VerificarEmail;
