import socket
import time

ROBOT_IP = "172.27.44.18"
ROBOT_PORT = 4210

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

def powerMotors(left:int, right: int) -> None: 
    payload = bytearray(2)
    payload[0] = left
    payload[1] = right
    sock.sendto(payload, (ROBOT_IP, ROBOT_PORT))

def runMotors(left:int, right:int, timeMs:int = 1000):
    times = int(timeMs/25)
    for n in range(0,times):
        powerMotors(left,right)
        time.sleep(0.025)

def testMotors():
    print("Simple test of motors one after the other")
    print("Left motor forward for 5 sec")
    runMotors(180,90,5000)
    print("Left motor backward for 5 sec")
    runMotors(0,90,5000)
    print("Right motor forward for 5 sec")
    runMotors(90,180,5000)
    print("Right motor backward for 5 sec")
    runMotors(90,0,5000)

def testOutOfBound():
    print("Sends invalid messages to bot. Please don't burn.")
    powerMotors(255,255)

def testServerBusy():
    print("Send some data then stops for a while.")
    print("Running forward 5 second")
    runMotors(120,120,5000)
    print("Pausing for 2 second")
    time.sleep(1)
    print("Running forward 5 second")
    runMotors(120,120,5000)
    print("Done")

