export function FormInputError({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <p className="text-sm text-red-600">{children}</p>;
}
