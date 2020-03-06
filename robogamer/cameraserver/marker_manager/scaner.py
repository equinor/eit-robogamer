import numpy as np
import glob
import sys
import cv2, PIL
from cv2 import aruco
import math

def get_corners_by_id(id, ids, corners):
    idx = np.where(ids == id)
    idx = idx[0][0]
    id_corners = corners[idx][0]
    return id_corners

def get_board_corners(ids, corners):
    corner_ids = [66, 67, 68, 69]
    try:
        if ids.any():
            ids = ids.flatten()
            result = all([x in ids for x in corner_ids])
            if result:
                upleft = get_corners_by_id(66, ids, corners)
                downleft = get_corners_by_id(67, ids, corners)
                upright = get_corners_by_id(68, ids, corners)
                downright = get_corners_by_id(69, ids, corners)
                board_corners = np.array([upleft[2], downleft[1], upright[3], downright[0]])
                marker_size = abs(upleft[0][0] - upleft[1][0])
                return board_corners, marker_size
            else:
                main_list = [x for x in corner_ids if x not in ids]
                #print("corners that are not detected: ", main_list)
                return 0, 0
    except Exception as err: 
        print(err)
        return 0, 0

def get_object_points(width):
    objp_arc = np.array([
    (0.0, 0.0, 0.0),
    (0.0, 9.0, 0.0),
    (16.0, 0.0, 0.0),    
    (16.0, 9.0, 0.0)
    ])
    objp = []
    perstep = 16/width
    for i in np.arange(0.0, 16.00001, perstep/2):
        for j in np.arange(0.0, 9.00001, perstep/2):
            objp.append([i, j, 0.0])
    objp = np.array(objp)
    return objp_arc, objp

def get_image_points(board_corners, gray, objp_arc, mtx, dist, objpts):
    corners2 = cv2.cornerSubPix(gray,board_corners,(11,11),(-1,-1),criteria)
    ret, rvecs, tvecs = cv2.solvePnP(objp_arc, corners2, mtx, dist)
    # project 3D points to image plane
    imgpts, jac = cv2.projectPoints(objpts, rvecs, tvecs, mtx, dist)
    imgpts = np.around(imgpts)
    imgpts = imgpts.reshape(-1, imgpts.shape[-1])
    return imgpts

def get_coordinates(ids, corners, objpts, imgpts, marker_size):
    corners_id = [66, 67, 68, 69]
    try:
        df = []
        if ids.any():
            try:
                ids = ids.flatten()        
                for x in ids:
                    if x not in corners_id:
                        c = get_corners_by_id(x, ids, corners)
                        px, py = c[:, 0].mean(), c[:, 1].mean()
                        px, py = round(px), round(py)
                        idx = np.where((imgpts[:,0] == px)&(imgpts[:,1] == py))[0][0]
                        coord = objpts[idx]
                        delta_y = c[1, 1] - c[0, 1]
                        delta_x = c[1, 0] - c[0, 0]
                        max_px = 16 - marker_size
                        max_py = 9 - marker_size
                        if coord[0] < marker_size:
                            coord[0] = marker_size
                        if coord[1] < marker_size:
                            coord[1] = marker_size
                        if coord[0] > max_px:
                            coord[0] = max_px
                        if coord[1] > max_py:
                            coord[1] = max_py
                        
                        angleInRadian = math.atan2(delta_y, delta_x)
                        df.extend([x, coord[0], coord[1], angleInRadian])
            except Exception as err:
                print(err)
                pass
            df = "|".join(str(x) for x in df)
    except:
        return ""
    return df

if __name__ == "__main__":
    
    capture = cv2.VideoCapture(0)
    aruco_dict = aruco.Dictionary_get(aruco.DICT_6X6_100)
    criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 30, 0.001)
    mtx = np.load("cameraserver/marker_manager/calib_mtx.npy")
    dist = np.load("cameraserver/marker_manager/calib_dist.npy")
    # # # local config
    # mtx = np.load("calib_mtx.npy")
    # dist = np.load("calib_dist.npy")
    tracking_corners_captured = False
    game_controller = ""

    if capture.isOpened():
        frame_captured, frame = capture.read()
    else:
        frame_captured = False
    while frame_captured:
        height, width = frame.shape[:2]
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        parameters =  aruco.DetectorParameters_create()
        corners, ids, rejectedImgPoints = aruco.detectMarkers(gray, aruco_dict, parameters=parameters)
        if not tracking_corners_captured:
            board_corners, marker_size = get_board_corners(ids, corners)
            try:
                if board_corners.all():
                    tracking_corners_captured = True
                    objp_arc, objpts = get_object_points(width)
                    imgpts = get_image_points(board_corners, gray, objp_arc, mtx, dist, objpts)
                    marker_size = marker_size*16/width
            except:
                pass
        
        if tracking_corners_captured:
            result = get_coordinates(ids, corners, objpts, imgpts, marker_size)
            print(result)
            sys.stdout.flush()
        #frame_markers = aruco.drawDetectedMarkers(frame.copy(), corners, ids)
        #cv2.imshow("Captured Frame", frame)
        if cv2.waitKey(1) & 0xFF == ord("q"):
            break
        frame_captured, frame = capture.read()

    # release the video capture
    capture.release()
    cv2.destroyAllWindows()

