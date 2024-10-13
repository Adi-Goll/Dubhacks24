file_path = "hl7Examples/specificInstructions.hl7"

with open(file_path, 'r') as file:
    message = file.read()

#message = "MSH|^~\\&|SENDING_APPLICATION|SENDING_FACILITY|RECEIVING_APPLICATION|RECEIVING_FACILITY|202212290801||ADT^A01|93457|P|2.5|||||"

lines = message.split('\n')

# patient info, allergen info, insurance, disability, diagnosis, pharamacy treatment
PID = AL1 = IN1 = None
RX = []


for i in range(len(lines)):
    lines[i] = lines[i].split('|')
    if lines[i][0] == "PID":
        PID = ["NAME", lines[i][5].split("^"), "SEX", lines[i][8]]
        print(PID)
    elif lines[i][0] == "AL1":
        AL1 = lines[i][2].split("^")
        print(AL1)
    elif lines[i][0] == "IN1":
        IN1 = lines[i][2].split("^")
        print(IN1)
    elif 'RXE' in lines[i][0]:
        RX += [x for x in lines[i] if x]
        print(RX)