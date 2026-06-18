export const extractLocationName = ({
  timezone,  
}) => {
    console.log(timezone);
    if(!timezone) return "Unknown";
    return timezone.split("/").pop().replaceAll("_"," ");
};