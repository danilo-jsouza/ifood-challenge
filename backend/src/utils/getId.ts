export default function getId(url: string): string {
  const [uuid] =
    url.match(
      '({){0,1}[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}(}){0,1}',
    ) || [];

  return uuid;
}
