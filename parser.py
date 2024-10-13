import hl7

message = "whatever we scan in"

returnObj = hl7.parse(message)


msh_segment = returnObj[0]
evn_segment = returnObj[1]
pid_segment = returnObj[2]

# Access the fields of a segment
sending_application = msh_segment[2]
patient_id = pid_segment[2]