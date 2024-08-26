import { useParams } from "react-router-dom";
import { useOnePokemonByNameQuery } from "../Redux/pokemon";
import CircularProgress from "@mui/material/CircularProgress";
import DetailsThumb from "./DetailsThumb";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Badge, Button, IconButton, styled } from "@mui/material";
import RemoveIcon from '@mui/icons-material/Remove';
import { Add, ShoppingCart } from "@mui/icons-material";
import { Addplus, Addprodack, removeplus } from "../Redux/counterSlice";
const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
     color:'#000'
    },
  }));
const Products = () => {
    
    const dispatch = useDispatch()
    // @ts-ignore
    const {arreycart ,arreycartid} = useSelector((state) => state.counter)
    const pricepue = (itemapi) => {
        const arr = arreycart.find((item) => {
          return item.id === itemapi.id 
        })
        return arr.quantity
      }
  const myRef = useRef(null);
  const [index, setindex] = useState(0);
  const handleTab = (index) => {
    setindex(index);
    const images = myRef.current.children;
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace("active", "");
    }
    images[index].className = "active";
  };
  let { id } = useParams();
  const { data, isLoading } = useOnePokemonByNameQuery(id);
  if (isLoading) {
    return <CircularProgress />;
  }
  return (
    <div className="app">
      {
        <div className="details">
          <div className="big-img">
            <img src={data.imageLink[index]} alt="" />
          </div>

          <div className="box">
            <div className="row">
              <h2>{data.productName}</h2>
              <span>${data.price}</span>
            </div>

            <p>{data.description}</p>

            <DetailsThumb
              images={data.imageLink}
              tab={handleTab}
              myRef={myRef}
            />
             {arreycartid.includes(data.id) ? (<div dir="rtl" style={{display: 'flex' ,alignItems: 'center' ,    justifyContent: 'flex-end'}}>
<IconButton 
  onClick={() => {
    dispatch(Addplus(data))
  }}
sx={{ ml:1.5}} color='primary' >   
  <Add/>
</IconButton>
<StyledBadge badgeContent={pricepue(data)} color='primary'>  
</StyledBadge>
<IconButton 
  onClick={() => {
    dispatch(removeplus(data))
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
                  dispatch(Addprodack(data))
                  
                }}
              >
               <ShoppingCart sx={{fontSize:'18px', mr:1}}/>  Add To Cart
              </Button>)}
          </div>
        </div>
      }
    </div>
  );
};

export default Products;
