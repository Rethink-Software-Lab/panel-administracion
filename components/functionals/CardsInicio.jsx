import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default async function CardsInicio({ description, getData }) {
  const { data, errors } = await getData();
  return (
    <Card>
      <CardHeader>
        <CardDescription>{description}</CardDescription>
        <CardTitle className="text-4xl">${Math.floor(data)}</CardTitle>
      </CardHeader>
    </Card>
  );
}
