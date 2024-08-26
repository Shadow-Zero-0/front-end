import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import RemoveIcon from '@mui/icons-material/Remove';
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import Typography from "@mui/material/Typography";
import CircularProgress from '@mui/material/CircularProgress';
import Button from "@mui/material/Button";
import { Badge, IconButton, Stack, styled } from "@mui/material";
import { useGetPokemonByNameQuery } from '../Redux/pokemon'
import { useDispatch, useSelector } from "react-redux";
import { Addplus, Addprodack, removeplus } from "../Redux/counterSlice";
import { Add, ShoppingCart } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
   color:'#000'
  },
}));
const Home = () => {
  // @ts-ignore
  const {arreycart ,arreycartid} = useSelector((state) => state.counter)
  const theme = useTheme();
  const { data, isLoading } = useGetPokemonByNameQuery()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  if(isLoading){
    return(
      <CircularProgress />
    )
  }
  const pricepue = (itemapi) => {
    const arr = arreycart.find((item) => {
      return item.id === itemapi.id 
    })
    return arr.quantity
  }

  return (
    <Stack
      sx={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}
    >
      {data.map((item ) => {
    
        return (
          <Card className="card" key={item.id} sx={{ maxWidth: 277, mb: 3, mx: 5 }}>
            <CardMedia
              component="img"
              height="250px"
              image={item.imageLink[0]}
              alt="Paella dish"
              onClick={() => {
                navigate(`products/${item.id}`)
              }}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {item.description}
              </Typography>
            </CardContent>
            <CardActions
              disableSpacing
              sx={{ justifyContent: " space-between" }}
            >
             {arreycartid.includes(item.id) ? (<div dir="rtl" style={{display: 'flex' ,alignItems: 'center'}}>
<IconButton 
  onClick={() => {
    dispatch(Addplus(item))
  }}
sx={{ ml:1.5}} color='primary' >   
  <Add/>
</IconButton>
<StyledBadge badgeContent={pricepue(item)} color='primary'>  
</StyledBadge>
<IconButton 
  onClick={() => {
    dispatch(removeplus(item))
  }}
sx={{ mr:1.5}}  color='primary'>
  <RemoveIcon/>
  </IconButton>
</div>) :(
               <Button
                sx={{ textTransform: "capitalize", lineHeight: 1.1, p: 1 }}
                variant="contained"
                color="primary"
                onClick={() => {
                  dispatch(Addprodack(item))
                  
                }}
              >
               <ShoppingCart sx={{fontSize:'18px', mr:1}}/>  Add To Cart
              </Button>)}

              <Typography variant="body1" color={theme.palette.error.light}>
                $ {item.price}
              </Typography>
            </CardActions>
          </Card>
        );
      })}
    </Stack>
  );
};

export default Home;
