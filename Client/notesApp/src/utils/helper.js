export const getInitials = (name) => {
    const sepNames = name.split(" ");
    return sepNames[0].charAt(0) + sepNames[1].charAt(0);
    
}