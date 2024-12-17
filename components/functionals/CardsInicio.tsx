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
  data: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardDescription>{description}</CardDescription>
        <CardTitle className="text-2xl">{data}</CardTitle>
      </CardHeader>
    </Card>
  );
}
