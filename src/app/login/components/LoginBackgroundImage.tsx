import Image from "next/image";

export function LoginBackgroundImage() {
  return (
    <Image
      fill
      src="/images/pexels-mateusz-dach-99805-1055081.jpg"
      alt="Foto de um campo"
      sizes="(max-width: 768px) 100vw 100vh, (max-width: 1920px) 100vw 100vh, 33vw 100vh"
      className="object-fill"
      quality={100}
    />
  );
}
