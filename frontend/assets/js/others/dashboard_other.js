const totalTodayFlight = async () => {
    try {
        const response = await axios.get('localhost:5000/api/dashboard/total_today', {'Set-Cookie': document.cookie});

        const ttf = response.data;

        return ttf;
    } catch (error) {
        console.log(error);
    }
}

const totalTomorowFlight = async () =>{
    try {
        const response = await axios.get('localhost:5000/api/dashboard/total_tomorow', {'Set-Cookie': document.cookie});

        const ttf = response.data;

        return ttf;
    } catch (error) {
        console.log(error);
    }
}

const totalUser = async () => {
    try {
        const response = await axios.get('localhost:5000/api/dashboard/total_user',{'Set-Cookie': document.cookie});

        const tu = response.data;

        return tu;
    } catch (error) {
        console.log(error);
    }
}

const totalBooking = async () => {
    try {
        const response = await axios.get('localhost:5000/api/dashboard/total_booking_number', {'Set-Cookie': document.cookie});

        const tb = response.data;

        return tb;
    } catch (error) {
        console.log(error);
    }
}

const calc = async() => {
    console.log('deneme');
    document.getElementById('ttf').innerHTML = await totalTodayFlight();
    document.getElementById('tmtf').innerHTML = await totalTomorowFlight();
    document.getElementById('tu').innerHTML = await totalUser();
    document.getElementById('bn').innerHTML = await totalBooking();
}

calc();