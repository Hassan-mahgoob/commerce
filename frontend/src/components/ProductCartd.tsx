import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useCart } from "../context/Cart/Cartcontext";

interface Props {
  _id: string;
  title: string;
  image: string;
  price: string;
}

export default function ProductCart({ _id, title, price, image }: Props) {
  const { addItemTocart } = useCart();
  return (
    <Card>
      <CardMedia sx={{ height: 140 }} image={image} title="green iguana" />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          sx={{ fontWeight: "bold" }}
          component="div"
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", fontWeight: "bold" }}
        >
          {price} $
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          size="small"
          sx={{ fontWeight: "bold" }}
          onClick={() => addItemTocart(_id)}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
