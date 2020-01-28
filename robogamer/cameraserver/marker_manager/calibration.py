# script to implement camera tracking
import cv2
from cv2 import aruco
import math
import numpy as np
import sys
import json

def get_cordinates(ids, corners):
    try:
        global corner_1, corner_2, corner_3, corner_4, units
        if ids.any():
            try:
                for i in range(len(ids)-1, -1, -1):
                    if ids[i][0] == 66:
                        print("maker 66 detected")
                        c = corners[i][0]                        
                        corner_1 = c[2]
                        #print(corner_1);
                    if ids[i][0] == 68:
                        print("maker 68 detected")
                        c = corners[i][0]                        
                        corner_2 = c[3]
                        #print(corner_2);
                    if ids[i][0] == 69:
                        print("maker 69 detected")
                        c = corners[i][0]                        
                        corner_3 = c[0]
                        #print(corner_3);
                    if ids[i][0] == 67:
                        print("maker 67 detected")
                        c = corners[i][0]                        
                        corner_4 = c[1]
                        #print(corner_4);
                
                        delta_y = c[1, 1] - c[0, 1]
                        delta_x = c[1, 0] - c[0, 0]
                        angleInRadian = math.atan2(delta_y, delta_x)
                edge_up =  corner_2[0]-corner_1[0]  #distance between 66 and 68 
                edge_right = corner_3[1] - corner_2[1]
                edge_down = corner_3[0] - corner_4[0]
                edge_left = corner_4[1] - corner_1[1]
                edge_max = max(edge_up, edge_down)
                units = edge_max/16
                #print(edge_up/units,edge_right/units,edge_down/units, edge_left/units)
                        #print([ids[i][0], px, py, angleInRadian])
            except:
                pass
    except:
        return ""
    return units, corner_1, corner_2, corner_3, corner_4

if __name__ == '__main__':
    capture = cv2.VideoCapture(1)
    aruco_dict = aruco.Dictionary_get(aruco.DICT_6X6_100)
    
    if capture.isOpened():
        frame_captured, frame = capture.read()
    else:
        frame_captured = False
    while frame_captured:
        # height, width = frame.shape[:2]
        # unit = width/16
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        parameters =  aruco.DetectorParameters_create()
        corners, ids, rejectedImgPoints = aruco.detectMarkers(gray, aruco_dict, parameters=parameters)
        try:
            units, corner_1, corner_2, corner_3, corner_4 = get_cordinates(ids, corners)
        
            print(units, corner_1, corner_2, corner_3, corner_4)
            
            data = {
            "unit": units,
            "corner_1": [int(x) for x in corner_1],
            "corner_2": [int(x) for x in corner_2],
            "corner_3": [int(x) for x in corner_3],
            "corner_4": [int(x) for x in corner_4],
            }
            with open('data.txt', 'w') as outfile:
                json.dump(data, outfile)
        except: 
            #print("Not all corner markers are in tracking area")
            pass
        
        break

        sys.stdout.flush()
        #frame_markers = aruco.drawDetectedMarkers(frame.copy(), corners, ids)
        cv2.imshow('Captured Frame', frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
        frame_captured, frame = capture.read()

    # release the video capture
    capture.release()
    cv2.destroyAllWindows()