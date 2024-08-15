export const getInitials = (name) => {
    name = "Devansh Kumar";
    sepNames = name.split(" ");
    return sepNames[0].charAt(0) + sepNames[1].charAt(0);
    
}