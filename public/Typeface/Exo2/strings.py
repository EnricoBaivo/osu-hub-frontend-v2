
#  get data outof current dir 

import os
import sys

dir_path = os.path.dirname(os.getcwd() + "/public/Typeface/Exo2/")

# get each filename in dir_path
for filename in os.listdir(dir_path):
    print(filename)
    # print(dir_path + "/" + filename)
    # print(dir_path + "/" + filename + "/python.py")
    # print(os.path.exists(dir_path + "/" + filename + "/python.py"))
    # print(os.path.isfile(dir_path + "/" + filename + "/python.py"))
    # print(os.path.isdir(dir_path + "/" + filename + "/python.py"))
   