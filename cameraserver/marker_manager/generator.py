import numpy as np
import cv2, PIL
from cv2 import aruco
import matplotlib.pyplot as plt
import matplotlib as mpl
import pandas as pd

aruco_dict = aruco.Dictionary_get(aruco.DICT_6X6_250)
fig = plt.figure()
nx = 5
ny = 2
for i in range(1, nx*ny+1):
    ax = fig.add_subplot(ny,nx, i)
    img = aruco.drawMarker(aruco_dict,i+9, 500)
    plt.imshow(img, cmap = mpl.cm.gray, interpolation = "nearest")
    ax.axis("off")

plt.savefig("../marker_images/markers.jpg")

# import sys
# from cv2 import imwrite

# from ar_markers.marker import HammingMarker

# if __name__ == '__main__':
#     if len(sys.argv) > 1:
#         if sys.argv[1] == '--generate':
#             for i in range(int(sys.argv[2])):
#                 marker = HammingMarker.generate(3)
#                 imwrite('../marker_images/marker_{}.png'.format(marker.id), marker.generate_image())
#                 print("Generated Marker with ID {}".format(marker.id))
#         else:
#             marker = HammingMarker(id=int(sys.argv[1]))
#             imwrite('../marker_images/marker_{}.png'.format(marker.id), marker.generate_image())
#             print("Generated Marker with ID {}".format(marker.id))
#     else:
#         marker = HammingMarker.generate(3)
#         imwrite('../marker_images/marker_{}.png'.format(marker.id), marker.generate_image())
#         print("Generated Marker with ID {}".format(marker.id))
#     print('Done!')