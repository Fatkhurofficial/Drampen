document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    const dramaList = document.getElementById('dramaList');

    searchButton.addEventListener('click', async () => {
        const keyword = searchInput.value;
        const response = await fetch(`/api/search?keyword=${keyword}`);
        const data = await response.json();
        displayDramas(data.data.suggestList);
    });

    function displayDramas(dramas) {
        dramaList.innerHTML = '';
        dramas.forEach(drama => {
            const dramaElement = document.createElement('div');
            dramaElement.classList.add('drama-item');
            dramaElement.innerHTML = `
                <img src="${drama.coverUrl}" alt="${drama.name}" width="150">
                <p>${drama.name}</p>
            `;
            dramaElement.addEventListener('click', () => getStreamLink(drama.id, 1));
            dramaList.appendChild(dramaElement);
        });
    }

    async function getStreamLink(bookId, index) {
        const response = await fetch(`/api/stream-link?bookId=${bookId}&index=${index}`);
        const data = await response.json();
        const streamUrl = data.data.chapterList[0].cdnList[0].url;
        playVideo(streamUrl);
    }

    function playVideo(url) {
        const videoPlayerContainer = document.getElementById('videoPlayerContainer');
        const videoPlayer = document.getElementById('videoPlayer');
        videoPlayerContainer.style.display = 'block';
        videoPlayer.src = url;
        videoPlayer.play();
    }
});
