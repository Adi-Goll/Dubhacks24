import json

def parse_hl7():
    file_path = "./server/hl7Examples/specificInstructions.hl7"

    with open(file_path, 'r') as file:
        message = file.read()

    lines = message.split('\n')

    # patient info, allergen info, insurance, disability, diagnosis, pharmacy treatment
    PID = AL1 = IN1 = None
    RX = []

    for i in range(len(lines)):
        lines[i] = lines[i].split('|')
        if lines[i][0] == "PID":
            PID = {"NAME": lines[i][5].split("^"), "SEX": lines[i][8]}
        elif lines[i][0] == "AL1":
            AL1 = lines[i][2].split("^")
        elif lines[i][0] == "IN1":
            IN1 = lines[i][2].split("^")
        elif 'RXE' in lines[i][0]:
            RX += [x for x in lines[i] if x]

    # Prepare the data to be returned
    result = {
        "PID": PID,
        "AL1": AL1,
        "IN1": IN1,
        "RX": RX
    }

    # Convert the result to JSON and print it
    print(json.dumps(result))

if __name__ == "__main__":
    parse_hl7()