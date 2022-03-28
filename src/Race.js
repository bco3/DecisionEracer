import {useState, useEffect} from 'react';
import './drivers.css';
import './track.css';
import './main.css';
import './text.css';


export const Race = () => {

    //go is the start button, used to start the race, and inmpacts the timing for resultScreen//
    const [go,setGo] = useState('START');
    const [follow, setFollow] = useState('')
    //resultScreen is used to apply new JSX that is the results screen when race ends//
    const [resultScreen, setResultScreen] = useState('off')

    //laneTime stores pre set race time results for each lanes active racer and are predetermined by selecting the racer.
    //laneTime animation is used to setup Slow or Fast racer animation to JSX css//
    const [lane1Time,setLane1Time] = useState({time:null, animation:''});
    const [lane2Time,setLane2Time] = useState({time:null, animation:''});
    const [lane3Time,setLane3Time] = useState({time:null, animation:''});
    const [lane4Time,setLane4Time] = useState({time:null, animation:''});
    const [lane5Time,setLane5Time] = useState({time:null, animation:''});

    //pup, dan, honey, golden, foxy, name: is used for driver css className, 
    //id: is used for changing racer animations
    //position: is used for moving the racers
    //sponsor: is used to hold input value for decision options that each racer may race on behalf of//
    const [pup, setPup] = useState(
        {
            name: 'pup',
            src: './img/pup.png',
            alt: 'Wheel chair puppy',
            id: 'pup',
            position: 'lane1Out',
            sponsor: ''
        });
    const [dan, setDan] = useState(
        {
            name: 'dan',
            src: './img/dan.png',
            alt: 'Race car sloth',
            id: 'dan',
            position: 'lane2Out',
            sponsor: ''
        });
    const [honey, setHoney] = useState(
        {
            name: 'honey',
            src: './img/honey.png',
            alt: 'Bumble bee',
            id: 'honey',
            position: 'lane3Out',
            sponsor: ''
        });
    const [golden, setGolden] = useState(
        {
            name: 'golden',
            src: './img/golden.png',
            alt: 'Skateboard bear',
            id: 'golden',
            position: 'lane4Out',
            sponsor: ''
        });
    const [foxy, setFoxy] = useState(
        {
            name: 'foxy',
            src: './img/foxy.png',
            alt: 'Fox',
            id: 'foxy',
            position: 'lane5Out',
            sponsor: ''
        });

    //laneAnimationTime is used to prepare racers times to be used in JSX variable for animation-duration://
    const lane1AnimationTime = { animationDuration: lane1Time.time + 's'}
    const lane2AnimationTime = { animationDuration: lane2Time.time + 's'}
    const lane3AnimationTime = { animationDuration: lane3Time.time + 's'}
    const lane4AnimationTime = { animationDuration: lane4Time.time + 's'}
    const lane5AnimationTime = { animationDuration: lane5Time.time + 's'}

    //when start is clicked, triggers useEffects to countdown and start race.//
    const handleGo = (e) => {
        e.target.id = 'go';
        window.scrollTo({top:190, left: 0, behavior: 'smooth'});
        setGo('MARK');
    }
    useEffect(() => {
        if(go === 'MARK') {
        setResultScreen('set');
        setFollow('follow')
        const markSet = setTimeout(() =>
        setGo('SET'),1300)
        return() => clearTimeout(markSet);
       }},[go, resultScreen])

    //setting up results screen with winner or ties as well as their sponsored options//
    const raceResults = () => {
        //rounder uses multiply 8 rather than 10 cause each racers moving animation crosses finish line at 80% of animation duration//
        let rounder = (num) => { return Math.round(num * 8)/10}
        let lane1 = ['pupWin', rounder(lane1Time.time),pup.sponsor];
        let lane2 = ['danWin', rounder(lane2Time.time),dan.sponsor];
        let lane3 = ['honeyWin', rounder(lane3Time.time),honey.sponsor];
        let lane4 = ['goldenWin', rounder(lane4Time.time),golden.sponsor];
        let lane5 = ['foxyWin', rounder(lane5Time.time),foxy.sponsor];
        let firstLast = [['No Racers', 11,'No Sponsor'],['No Racers', 3,'No Sponsor']];
        const result = (lane, fastSlow) => {
            if (lane[1] > fastSlow[1][1]){fastSlow.splice(1,1,lane)}
            lane[1] < fastSlow[0][1] ? fastSlow.splice(0,1,lane)
            : lane[1] === fastSlow[0][1] ? fastSlow.splice(0,0,lane)
            : lane = ['No Record', null,''];  
            return fastSlow
        }
        [lane1, lane2, lane3, lane4, lane5].forEach((e)=> {if (e[1] !== 0){ let tempRes = result(e, firstLast); return firstLast = tempRes;}} );
        return firstLast;
    }

    const raceResultsFinished = raceResults();
    const the2ndWinner = () => {return raceResultsFinished.length > 2 ? raceResultsFinished[1][0] : null};
    const the2ndWinnerText = () => {return raceResultsFinished.length > 2 ? raceResultsFinished[1][2] : null};
    const the3rdWinner = () => {return raceResultsFinished.length > 3 ? raceResultsFinished[2][0] : null};
    const the3rdWinnerText = () => {return raceResultsFinished.length > 3 ? raceResultsFinished[2][2] : null};
    const theWinner = () => {return raceResultsFinished[0][0]};
    const theWinnerText = () => {return raceResultsFinished[0][2]};

    //starts race, gets racers moving, and page to follow racers from left to right//
    // const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    const vw = Math.max(window.innerWidth || 0, window.visualViewport.width || 0, document.documentElement.clientWidth || 0, window.innerWidth || 0)

    useEffect(() => {
        if(go ==='SET'){
        const markSetGo = setTimeout(() => {
            setGo('GO!');
            if(vw < 1400){document.querySelector('#follow').style.setProperty('--tracking',vw - 1448 + 'px');}
            if(pup.position === 'lane1Set'){setPup({...pup, position:lane1Time.animation, id:'pupMove'})}
            if(dan.position === 'lane2Set'){setDan({...dan, position:lane2Time.animation, id:'danMove'})}
            if(honey.position === 'lane3Set'){setHoney({...honey, position:lane3Time.animation, id:'honeyMove'})}
            if(golden.position === 'lane4Set'){setGolden({...golden, position:lane4Time.animation, id:'goldenMove'})}
            if(foxy.position === 'lane5Set'){setFoxy({...foxy, position:lane5Time.animation, id:'foxyMove'})}
        },1300)
            return() => clearTimeout(markSetGo);
        }},[go, pup, dan, honey, golden, foxy, lane1Time.animation, lane2Time.animation, lane3Time.animation, lane4Time.animation, lane5Time.animation, vw])
    
    //JSX for results screen displayed at end of race//
    const winResultsCover = (winnerDisplay) => { if (winnerDisplay=== 'on'){
        return(<div className='winnerCover' id='winnerCover' >
            <h1 className='winnerText' id='winnerText' >WINNER!!!</h1>
            {/* <div className='winContainer'>
                <div className={theWinner()+'Shadow'} id={theWinner()+'Shadow'} ></div>
                <div className={the2ndWinner()+'Shadow'} id={the2ndWinner()+'Shadow'} ></div>
                <div className={the3rdWinner()+'Shadow'} id={the3rdWinner()+'Shadow'} ></div>
            </div> */}
            <div className='winContainer'>
                <div className={theWinner()} id={theWinner()} alt={theWinner()} ></div>
                <div className={the2ndWinner()} id={the2ndWinner()} alt={the2ndWinner()} ></div>
                <div className={the3rdWinner()} id={the3rdWinner()} alt={the2ndWinner()} ></div>
            </div>
            <h2 className='winnerSponsor' id='winnerSponsor'>{theWinnerText()}</h2>
            <h2 className='winner2Sponsor' id='winner2Sponsor'>{the2ndWinnerText()}</h2>   
            <h2 className='winner3Sponsor' id='winner3Sponsor'>{the3rdWinnerText()}</h2>   
        </div>)
        } if (winnerDisplay === 'set'){
        return  <div className='winnerCover' >
              <h1 className='winnerText' >WINNER!!!</h1>
              <h2 className='winnerSponsor' >{theWinnerText()}</h2>
              <h2 className='winner2Sponsor' >{the2ndWinnerText()}</h2>   
              <h2 className='winner3Sponsor' >{the3rdWinnerText()}</h2>   
        </div>}
    <div></div>;}
    //timing for when results screen starts and when it finishes and resets app//
    useEffect(() => {
        if(go ==='GO!'){
        const goResult = setTimeout(() =>
        { setResultScreen('on')
        },raceResultsFinished[raceResultsFinished.length -1][1] * 1000 + 1800)
        const reset = setTimeout(() =>
        { window.location.reload();
        },raceResultsFinished[raceResultsFinished.length -1][1] * 1000 + 7000)
        return() => clearTimeout(goResult, reset);
        }},[go, resultScreen, raceResultsFinished])
    
    //racerVariable produces a degree of diviation from a racers average time of 9 seconds.
    //racerPradictable is 9 seconds minus the average of racerVariable x(0.5) which is the average out come of Math.random.//
    const raceTimeMaker = (racerVariable,racerPradictable) => {return (Math.random()* racerVariable) + racerPradictable}

    const setupRacer = (setLane) => {
        switch(setLane) {
        case 'setLane1': { setPup({...pup,position:'lane1Set', id:'pupMove'})
        let lane1 = document.getElementById('lane1input')
        lane1.focus();
        lane1.setAttribute('placeholder','enter sponsored option')
            let raceTime = raceTimeMaker(2.5,7.75);
            // let raceTime = raceTimeMaker(0,9);
            raceTime > 9 ? setLane1Time({time:raceTime, animation:'lane1Slow'})
            :setLane1Time({time:raceTime, animation:'lane1Fast'});
        break;}
        case 'setLane2': { setDan({...dan,position:'lane2Set', id:'danMove'})
        let lane2 = document.getElementById('lane2input')
        lane2.focus();
        lane2.setAttribute('placeholder','enter sponsored option')
            let raceTime = raceTimeMaker(1.5,8.15);
            // let raceTime = raceTimeMaker(0,9);
            raceTime > 9 ? setLane2Time({time:raceTime, animation:'lane2Slow'})
            :setLane2Time({time:raceTime, animation:'lane2Fast'});
        break;}
        case 'setLane3': { setHoney({...honey,position:'lane3Set', id:'honeyMove'})
            let lane3 = document.getElementById('lane3input')
            lane3.focus();
            lane3.setAttribute('placeholder','enter sponsored option')
            let raceTime = raceTimeMaker(2,7.95);
            // let raceTime = raceTimeMaker(0,9);
            raceTime > 9 ? setLane3Time({time:raceTime, animation:'lane3Slow'})
            :setLane3Time({time:raceTime, animation:'lane3Fast'});
        break;} 
        case 'setLane4': { setGolden({...golden,position:'lane4Set', id:'goldenMove'})
        let lane4 = document.getElementById('lane4input')
        lane4.focus();
        lane4.setAttribute('placeholder','enter sponsored option')
            let raceTime = raceTimeMaker(2.5,7.75);
            // let raceTime = raceTimeMaker(0,9);
            raceTime > 9 ? setLane4Time({time:raceTime, animation:'lane4Slow'})
            :setLane4Time({time:raceTime, animation:'lane4Fast'});
        break;}
        case 'setLane5': { setFoxy({...foxy,position:'lane5Set', id:'foxyMove'})
            let lane5 = document.getElementById('lane5input')
            lane5.focus();
            lane5.setAttribute('placeholder','enter sponsored option')
            let raceTime = raceTimeMaker(2,7.95);
            // let raceTime = raceTimeMaker(0,9);
            raceTime > 9 ? setLane5Time({time:raceTime, animation:'lane5Slow'})
            :setLane5Time({time:raceTime, animation:'lane5Fast'});
            break;}
            default:
            }}
            console.log(window.innerWidth)

    //function used to remove racer from race when user unclicks racers name//
    const removeRacer = (setLane) => {
        switch(setLane) {
        case 'setLane1': { setPup({...pup,position:'lane1Out', id:'pup'}); 
            setLane1Time({time:'', animation:''});
            document.getElementById('lane1input').setAttribute('placeholder','')
        break;}
        case 'setLane2': { setDan({...dan,position:'lane2Out', id:'dan'}); 
            setLane2Time({time:'', animation:''});
            document.getElementById('lane2input').setAttribute('placeholder','')
        break;}
        case 'setLane3': { setHoney({...honey,position:'lane3Out', id:'honey'}); 
        setLane3Time({time:'', animation:''});
        document.getElementById('lane3input').setAttribute('placeholder','')
        break;}
        case 'setLane4': { setGolden({...golden,position:'lane4Out', id:'golden'}); 
            setLane4Time({time:'', animation:''});
            document.getElementById('lane4input').setAttribute('placeholder','')
        break;}
        case 'setLane5': { setFoxy({...foxy,position:'lane5Out', id:'foxy'}); 
            setLane5Time({time:'', animation:''});
            document.getElementById('lane5input').setAttribute('placeholder','')
        break;}
        default:
    }}
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    //Checks when racer is clicked if the click is to remove racer or set them to join race.//
    const handleSetRacerClick = (e) => {
        e.target.checked ? setupRacer(e.target.id) : removeRacer(e.target.id);
    }   
    // Racer intro animations from Moving to Click to Idle //
    useEffect(() => { if ((pup.id === 'pupMove')&&(go === 'START')){
        const moveToClick= setTimeout(() => setPup({...pup,id:'pupClick'}),1700)
        return () => clearTimeout(moveToClick);}
        },[pup, go])
    useEffect(() => { if ((pup.id === 'pupClick')&&(go === 'START')){
        const clickToIdle= setTimeout(() => setPup({...pup,id:'pupIdle'}),3600)
        return () => clearTimeout(clickToIdle);}
        },[pup, go])
    useEffect(() => { if ((dan.id === 'danMove')&&(go === 'START')){
        const moveToClick= setTimeout(() => setDan({...dan,id:'danClick'}),1800)
        return () => clearTimeout(moveToClick);}
        },[dan, go])
    useEffect(() => { if ((dan.id === 'danClick')&&(go === 'START')){
        const clickToIdle= setTimeout(() => setDan({...dan,id:'danIdle'}),3700)
        return () => clearTimeout(clickToIdle);}
        },[dan, go])
    useEffect(() => { if ((honey.id === 'honeyMove')&&(go === 'START')){
        const moveToClick= setTimeout(() => setHoney({...honey,id:'honeyClick'}),1800)
        return () => clearTimeout(moveToClick);}
        },[honey, go])
    useEffect(() => { if ((honey.id === 'honeyClick')&&(go === 'START')){
        const clickToIdle= setTimeout(() => setHoney({...honey,id:'honeyIdle'}),3700)
        return () => clearTimeout(clickToIdle);}
        },[honey, go])
    useEffect(() => { if ((golden.id === 'goldenMove')&&(go === 'START')){
        const moveToClick= setTimeout(() => setGolden({...golden,id:'goldenClick'}),1100)
        return () => clearTimeout(moveToClick);}
        },[golden, go])
    useEffect(() => { if ((golden.id === 'goldenClick')&&(go === 'START')){
        const clickToIdle= setTimeout(() => setGolden({...golden,id:'goldenIdle'}),3000)
        return () => clearTimeout(clickToIdle);}
        },[golden, go])
    useEffect(() => { if ((foxy.id === 'foxyMove')&&(go === 'START')){
        const moveToClick= setTimeout(() => setFoxy({...foxy,id:'foxyClick'}),1500)
        return () => clearTimeout(moveToClick);}
        },[foxy, go])
    useEffect(() => { if ((foxy.id === 'foxyClick')&&(go === 'START')){
        const clickToIdle= setTimeout(() => setFoxy({...foxy,id:'foxyIdle'}),3000) 
        return () => clearTimeout(clickToIdle);}
        },[foxy, go])


return (
<div className="container" id={follow}>
  <div className="inner-container">
    <div className="grid-container">
        <div className='titleShadow' >DECISION eRACER</div>
        <div className='title' >DECISION eRACER</div>
        <div className='goShadow' >{go}</div>
        <div className='go' onClick={handleGo}>{go}</div>

        <input type='checkbox' id='setLane1' onClick={(e)=> handleSetRacerClick(e)} />
        <label className='btnLane1' htmlFor='setLane1'>PUPSTAR</label>
        <form className='lane1input' 
            onSubmit={(e)=> handleSubmit(e)} onKeyDown={(e)=> {if(e.keyCode === 13){ document.getElementById('lane1input').blur()}}}>
            <input id='lane1input' type='text' placeholder='' onChange={(e)=> setPup({...pup,sponsor:e.target.value})} />
        </form>
        {/* <div className='lane1' id={pup.position} style={lane1AnimationTime} >
            <div className='pupShadow' id={pup.id+'Shadow'} ></div>
        </div> */}
        <div className='lane1' id={pup.position} style={lane1AnimationTime}>
            <div className='pup' id={pup.id} alt={pup.alt}></div>
        </div>

        <input type='checkbox' id='setLane2' onClick={(e)=> handleSetRacerClick(e)} />
        <label className='btnLane2' htmlFor='setLane2'>SPEEDY</label>
        <form className='lane2input' 
            onSubmit={(e)=> handleSubmit(e)} onKeyDown={(e)=> {if(e.keyCode === 13){ document.getElementById('lane2input').blur()}}}>
            <input id='lane2input' type='text' placeholder='' onChange={(e)=> setDan({...dan,sponsor:e.target.value})} />
        </form>
        {/* <div className='lane2' id={dan.position} style={lane2AnimationTime}>
            <div className='danShadow' id={dan.id+'Shadow'} ></div>
        </div> */}
        <div className='lane2' id={dan.position} style={lane2AnimationTime}>
            <div className='dan' id={dan.id} alt={dan.alt} ></div>
        </div>

        <input type='checkbox' id='setLane3' onClick={(e)=> handleSetRacerClick(e)} />
        <label className='btnLane3' htmlFor='setLane3'>B-LINE</label>
        <form className='lane3input' 
            onSubmit={(e)=> handleSubmit(e)} onKeyDown={(e)=> {if(e.keyCode === 13){ document.getElementById('lane3input').blur()}}}>
            <input id='lane3input' type='text' placeholder='' onChange={(e)=> setHoney({...honey,sponsor:e.target.value})} />
        </form>
        {/* <div className='lane3' id={honey.position} style={lane3AnimationTime}>
            <div className='honeyShadow' id={honey.id+'Shadow'} ></div>
        </div> */}
        <div className='lane3' id={honey.position} style={lane3AnimationTime}>
            <div className='honey' id={honey.id} alt={honey.alt} ></div>
        </div>

        <input type='checkbox' id='setLane4' onClick={(e)=> handleSetRacerClick(e)} />
        <label className='btnLane4' htmlFor='setLane4'>SK8CUB</label>
        <form className='lane4input' 
            onSubmit={(e)=> handleSubmit(e)} onKeyDown={(e)=> {if(e.keyCode === 13){ document.getElementById('lane4input').blur()}}}>
            <input id='lane4input' type='text' placeholder='' onChange={(e)=> setGolden({...golden,sponsor:e.target.value})} />
        </form>
        {/* <div className='lane4' id={golden.position} style={lane4AnimationTime}>
            <div className='goldenShadow' id={golden.id + 'Shadow'} ></div>
        </div> */}
        <div className='lane4' id={golden.position} style={lane4AnimationTime}>
            <div className='golden' id={golden.id} alt={golden.alt} ></div>
        </div>

        <input type='checkbox' id='setLane5' onClick={(e)=> handleSetRacerClick(e)} />
        <label className='btnLane5' htmlFor='setLane5'>FOXY</label>
        <form className='lane5input' 
            onSubmit={(e)=> handleSubmit(e)} onKeyDown={(e)=> {if(e.keyCode === 13){ document.getElementById('lane5input').blur()}}}>
            <input id='lane5input' type='text' placeholder='' onChange={(e)=> setFoxy({...foxy,sponsor:e.target.value})} />
        </form>
        {/* <div className='lane5' id={foxy.position} style={lane5AnimationTime}>
            <div className='foxyShadow' id={foxy.id+'Shadow'} alt={foxy.alt} ></div>
        </div> */}
        <div className='lane5' id={foxy.position} style={lane5AnimationTime}>
            <div className='foxy' id={foxy.id} alt={foxy.alt} ></div>
        </div>
    </div>
  </div>
    {winResultsCover(resultScreen)}
</div>
);}

