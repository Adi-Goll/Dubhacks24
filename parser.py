file_path = "hl7Examples/allergen.hl7"

with open(file_path, 'r') as file:
    message = file.read()

#message = "MSH|^~\\&|SENDING_APPLICATION|SENDING_FACILITY|RECEIVING_APPLICATION|RECEIVING_FACILITY|202212290801||ADT^A01|93457|P|2.5|||||"

lines = message.split('\n')

# patient info, allergen info, insurance, disability, diagnosis, pharamacy treatment
PID = AL1 = IN1 = DB1 = DG1 = RX = None


for i in range(len(lines)):
    lines[i]= lines[i].split('|')    
    if lines[i][0] == "PID":
        PID = ["NAME", lines[i][5].split("^"), "SEX", lines[i][8]];
    if lines[i][0] == "AL1":
        AL1 = lines[i][2].split("^")
        print(AL1)
    if lines[i][0] == "IN1":
        IN1 = lines[i][2].split("^")
        print(IN1)
    if lines[i][0] == "DB1":
        DB1 = lines[i]
    if lines[i][0] == "DG1":
        DG1 = lines[i]
    if 'RX' in lines[i][0]:
        RX += lines[i]

# print(splitMsg)