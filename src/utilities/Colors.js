const FULL_COLORS = [
 'rgba(255, 255, 255)',
 'rgba(255, 255, 0)',
 'rgba(255, 0, 255)',
 'rgba(0, 255, 255)',
 'rgba(0, 0, 255)',
 'rgba(0, 255, 0)',
 'rgba(255, 0, 0)',
 'rgba(127, 51, 204)',
 'rgba(51, 204, 127)',
 'rgba(204, 127, 51)']


 function insertString(a, b, at){
    var position = a.indexOf(at);

    if (position !== -1)
    {
        return a.substr(0, position) + b + a.substr(position);
    }

    return "substring not found";
}

export default function colorChooser(index, alpha){
   let s = FULL_COLORS[index]

   return insertString(s, `, ${alpha}`, ')')
 }
