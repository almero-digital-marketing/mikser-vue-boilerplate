module.exports = [
    {
        lookup: 'Home',
        paths: {
            '$..media': [
                {
                    property: 'video',
                    processor: 'videos',
                    format: 'mp4',
                    cache: true,
                    actions: {
                        resize: [1280, 720],
                        videoBitrate: [600],
                        fps: [20],
                    }
                },
                {
                    property: 'poster',
                    processor: 'videos',
                    format: 'jpg',
                    cache: true,
                    actions: {
                        seek: [(item) => item.object.seek || "0"],
                        frames: [1],
                        size: ["50%"],
                    }
                }
            ],
        }
    },
]