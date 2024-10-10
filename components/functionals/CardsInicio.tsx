import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default async function CardsInicio({
  description,
  data,
}: {
  description: string;
  data: number;
}) {
  return (
    <Card>
      <CardHeader>
        <CardDescription>{description}</CardDescription>
        <CardTitle className="text-4xl">${data}</CardTitle>
      </CardHeader>
    </Card>
  );
}
