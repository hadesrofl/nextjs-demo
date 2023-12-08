import { Series } from "@customTypes/Series";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import Image from "next/image";

type SeriesCardProps = {
  series: Series;
  attributionText: string;
};

export default function SeriesCard(props: SeriesCardProps) {
  const { series, attributionText } = props;
  return (
    <Card>
      <CardMedia title={series.title}>
        <Image
          className="rounded-t-lg w-full"
          width={200}
          height={200}
          src={`${series.thumbnail.path}.${series.thumbnail.extension}`}
          alt=""
        />
      </CardMedia>
      <CardContent>
        <Typography variant="h5" component="div">
          {series.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {series.description}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {attributionText}
        </Typography>
      </CardContent>
    </Card>
  );
}
