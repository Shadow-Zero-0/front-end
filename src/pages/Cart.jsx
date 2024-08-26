import { Badge,  Box,  Button, Divider, IconButton, Paper, Stack, styled, Typography } from "@mui/material";
import RemoveIcon from '@mui/icons-material/Remove';
import { Add } from "@mui/icons-material";
import { useDispatch, useSelector } from 'react-redux'
import DeleteIcon from '@mui/icons-material/Delete';
import { Addplus, deleteprodack, removeplus } from "../Redux/counterSlice";
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
   color:'#fff'
  },
}));

const Cart = () => {
  // @ts-ignore
  const {arreycart} = useSelector((state) => state.counter)
  const dispatch = useDispatch()
  let price1 = 0
  return (
<Box>
  
 {arreycart.map((item) => {
  const price = item.price*item.quantity
  price1 += item.price*item.quantity
  return(
    <Paper key={item.price} dir="rtl" className="item-container" >
    <div className="img-title-parent">
        <img src={item.imageLink[0]} alt="" />
        <p className="product-name">{item.productName}</p>
    </div>
    <div style={{display: 'flex' ,alignItems: 'center'}}>
        <IconButton 
          onClick={() => {
            dispatch(Addplus(item))
          }}
        sx={{color:"#0288d1", ml:1.5}}  >   
          <Add/>
        </IconButton>
        <StyledBadge badgeContent={item.quantity} color="secondary">  
      </StyledBadge>
        <IconButton 
          onClick={() => {
            dispatch(removeplus(item))
          }}
        sx={{color:"#0288d1", mr:1.5}}>
          <RemoveIcon/>
          </IconButton>
    </div>
    <div className="price">
        ${price}
    </div>
    <Button 
      onClick={() => {
        dispatch(deleteprodack(item))
   
      }}
    sx={{display:{xs:'none',sm:'block'}}} variant="text" color="error">
      delete
    
    </Button>
    <IconButton 
      onClick={() => {
        dispatch(deleteprodack(item))
      }}
    sx={{display:{xs:'block',sm:'none'} , color: 'red'}} aria-label="" >
    <DeleteIcon />
    </IconButton>
    </Paper>
  )})}
  <Paper sx={{width:'200px', mx:'auto'}}>
    <Typography align="center" variant="h6" p={1.5} >Cart Summary</Typography>
    <Divider />
   <Stack p={1.5} direction='row' sx={{justifyContent:'space-between'}}>
   <Typography variant="body1" >Subtotle</Typography>
   <Typography variant="body1" >${price1}</Typography>
   </Stack>
    <Divider />
    <Button fullWidth variant="contained" color="primary">
      Checkout
    </Button>
  </Paper>
</Box>
  );
};

export default Cart;
