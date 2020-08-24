import React, {useState} from 'react'
import { Typography, Button, } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import FileUpload from '../../util/FileUpload'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { connect } from 'react-redux'
import { accountService} from '../../redux/actions/userActions';
import Axios from 'axios';
//import { useDispatch } from "react-redux"

const Category = [
    { key: 1, value: 'Film & Animation'},
    { key: 2, value: 'Autos & Vehicles'},
    { key: 3, value: 'Music'},
    { key: 4, value: 'Pets & Animals'},
    { key: 5, value: 'Sports'},
]

const Privacy = [
     {value: 0, label: 'Private'},
     {value: 1, label: 'Public'}
]


function UploadVideoPage(props) {

    // const dispatch = useDispatch()
    // const user = accountService.userValue.id
    // dispatch(getById(user));

    const [TitleValue, setTitleValue] = useState('')
    const [DescriptionValue, setDescriptionValue] = useState("")
    const [CategoryValue, setCategory] = useState("Film & Animation")
    const [PrivacyValue, setPrivacy] = useState(0)
    const [FilePath, setFilePath] = useState("")
    const [Duration, setDuration] = useState("") 
    const [Thumbnail, setThumbnail] = useState("")

 
    const onTitleChange = (event) => {
       setTitleValue(event.target.value)
    }

    const onDescriptionChange= (event) => {
        setDescriptionValue(event.target.value)
     }
   
     const onCategoryChange=(event)=> {
         setCategory(event.target.value)
     }

     const onPrivacyChange=(event)=> {
        setPrivacy(event.target.value)
    }

    const updateFilePath = (newVideo) => {
        console.log(newVideo)
        setFilePath(newVideo)
    }

    const updateThumbnailPath = (newThumbnail) => {
        console.log(newThumbnail)
        setThumbnail(newThumbnail)
    }

    const durationTime = (newDuration) => {
        console.log(newDuration)
        setDuration(newDuration)
    }

    const baseUrl = 'http://localhost:5000/youtube';

    const onSubmit = (event) => {
       event.preventDefault()

       if(!TitleValue || !DescriptionValue){
            return alert("All fields are required")
       }

      
    
       const user = accountService.userValue.id
       const dataToSubmit = {
           writer: user,
           title: TitleValue,
           description: DescriptionValue,
           filePath: FilePath,
           category: CategoryValue,
           privacy: PrivacyValue,
           duration: Duration,
           thumbnail: Thumbnail    
       }
           console.log("data", dataToSubmit)
       Axios.post(`${baseUrl}/video/uploadVideo`, dataToSubmit)
             .then((res) => {
                 if(res.data.success){
                       alert('Upload Successfully')
                       props.history.push('/landingPage')
                 }else{
                     alert('Upload Failed')
                 }
             })
    } 

    return (
        <div style={{ maxWidth: '700px', margin:'2rem auto'}}>
            <div style={{textAlign: 'center', marginBottom:'2rem'}}>
                 <Typography variant="h2">Upload Video</Typography>
            </div>
            
            <form onSubmit={onSubmit}>
               {/* dropzone */}
               <FileUpload
               refreshFunction = {updateFilePath}
               thumbnailRefresh = {updateThumbnailPath}
               duration = {durationTime}/>

               <br/>
               <br/>
               <TextField
               label="Title"
               required
               fullWidth
               variant='outlined'
               onChange={onTitleChange}
               value={TitleValue}/>

               <br/>
               <br/>
               <TextField
               label="Description"
               fullWidth
               required
               variant='outlined'
               multiline
               rows="5"
               onChange={onDescriptionChange}
               value={DescriptionValue}/>
               <br/>
               <br/>
               <Select value={CategoryValue} variant="outlined"  onChange={onCategoryChange}>
               {Category.map(item => 
                    <MenuItem key={item.key} value={item.value}>
                          {item.value}
                    </MenuItem>
               )}      
               </Select>
               <br/>
               <br/>
               <Select value={PrivacyValue} variant="outlined"  onChange={onPrivacyChange}>
               {Privacy.map(item => 
                    <MenuItem key={item.value} value={item.value}>
                          {item.label}
                    </MenuItem>
               )}      
               </Select>
                <br/>
                <br/>
  
            <Button variant="contained" color="primary" onClick={onSubmit}>
                Submit
            </Button>
            </form>

        </div>
    )
}

const mapStateToProps = (state) => ({
   users: state.user
   
  });

export default connect( mapStateToProps )(UploadVideoPage) 
