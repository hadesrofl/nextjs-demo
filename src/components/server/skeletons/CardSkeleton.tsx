import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import Image from "next/image";

export function CardSkeleton() {
  return (
    <Card className="min-h-screen min-w-[300px]">
      <CardContentSkeleton />
    </Card>
  );
}

export function CardContentSkeleton() {
  return (
    <>
      <CardMedia title="">
        <Image
          className="rounded-t-lg w-full"
          width={200}
          height={200}
          src=""
          alt=""
        />
      </CardMedia>
      <CardContent>
        <Typography variant="h5" component="div">
          Name
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Description
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Attribution
        </Typography>
      </CardContent>
    </>
  );
}
