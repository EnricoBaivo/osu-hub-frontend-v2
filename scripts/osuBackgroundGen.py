import json
import os


def generateBackgroundsList():
    basePath = os.getcwd()
    dir_list = os.listdir(basePath + "/public/osuBackgrounds/")
    get_list_of_files = [
        f"/osuBackgrounds/{dir}/{file}"
        for dir in dir_list
        for file in os.listdir(basePath + f"/public/osuBackgrounds/{dir}")
    ]
    print(get_list_of_files)
    with open(basePath + "/src/static-data/backgroundOsuHubImages.json", "w") as f:
        f.write(json.dumps(get_list_of_files))


if __name__ == "__main__":
    generateBackgroundsList()
