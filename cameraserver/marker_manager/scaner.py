# script to implement camera tracking
import cv2
from cv2 import aruco
import math
import numpy as np
import sys
import json

def get_json(input_file):
    with open(input_file, "r") as json_file:
        data = json.load(json_file)
        cali_x = min(data["corner_1"][0], data["corner_4"][0])
        cali_y = min(data["corner_1"][1], data["corner_2"][1])
    return data, cali_x, cali_y

def calculate_distance(x, y ,z): # distance from ponit z to line x-y
    p1 = np.array(x)
    p2 = np.array(y)
    p3 = np.array(z)
    d = np.cross(p2-p1, p3-p1) / np.linalg.norm(p2-p1)
    d = abs(d)
    return d

def get_cordinates(ids, corners, unit, cali_x, cali_y):
    try:
        df = []
        if ids.any():
            try:        
                for i in range(len(ids)-1, -1, -1):
                    c = corners[i][0]
                    px, py = c[:, 0].mean(), c[:, 1].mean()
                    delta_y = c[1, 1] - c[0, 1]
                    delta_x = c[1, 0] - c[0, 0]
                    angleInRadian = math.atan2(delta_y, delta_x)
                    df.extend([ids[i][0], (px-cali_x)/unit, (py-cali_y)/unit, angleInRadian])
            except:
                pass
            df = "|".join(str(x) for x in df)
    except:
        return ""
    return df


if __name__ == "__main__":
    data, cali_x, cali_y = get_json("cameraserver/marker_manager/data.txt")
    print(cali_x, cali_y)
    capture = cv2.VideoCapture(0)
    aruco_dict = aruco.Dictionary_get(aruco.DICT_6X6_100)
    
    if capture.isOpened():
        frame_captured, frame = capture.read()
    else:
        frame_captured = False
    while frame_captured:
        #height, width = frame.shape[:2]
        unit = data["unit"]
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        parameters =  aruco.DetectorParameters_create()
        corners, ids, rejectedImgPoints = aruco.detectMarkers(gray, aruco_dict, parameters=parameters)
        df = get_cordinates(ids, corners, unit, cali_x, cali_y)
        #print(len(ids))
        print(df)
        sys.stdout.flush()
        #frame_markers = aruco.drawDetectedMarkers(frame.copy(), corners, ids)
        cv2.imshow("Captured Frame", frame)
        if cv2.waitKey(1) & 0xFF == ord("q"):
            break
        frame_captured, frame = capture.read()

    # release the video capture
    capture.release()
    cv2.destroyAllWindows()