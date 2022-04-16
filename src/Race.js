import {useState, useEffect, useLayoutEffect} from 'react';
import './drivers.css';
import './track.css';
import './main.css';
import './text.css';


export const Race = () => {

//go is the start button, used to start the race, and inmpacts the timing for resultScreen//
    const [go,setGo] = useState('START');
    const [follow, setFollow] = useState('');
    const [viewWidth,setViewWidth] = useState(Math.min(window.visualViewport.width, document.documentElement.clientWidth, window.innerWidth))
//resultScreen is used to apply new JSX that is the results screen when race ends//
    const [resultScreen, setResultScreen] = useState('off');
    const [winnerEnter, setWinnerEnter] = useState('');
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
//sponsor: is used to hold input value for decision options that each racer may race on behalf of
//color: is used to set winners screen sponsor text color

    const [pup, setPup] = useState(
        {
            name: 'pup',
            src: './img/pup.png',
            alt: 'Wheel chair puppy',
            id: 'pup',
            position: 'lane1Out',
            sponsor: '',
            color: 'rgb(1, 1, 221)'
        });
    const [dan, setDan] = useState(
        {
            name: 'dan',
            src: './img/dan.png',
            alt: 'Race car sloth',
            id: 'dan',
            position: 'lane2Out',
            sponsor: '',
            color: 'rgb(221, 1, 56)'
        });
    const [honey, setHoney] = useState(
        {
            name: 'honey',
            src: './img/honey.png',
            alt: 'Bumble bee',
            id: 'honey',
            position: 'lane3Out',
            sponsor: '',
            color: 'rgb(255, 196, 0)'
        });
    const [golden, setGolden] = useState(
        {
            name: 'golden',
            src: './img/golden.png',
            alt: 'Skateboard bear',
            id: 'golden',
            position: 'lane4Out',
            sponsor: '',
            color: 'rgb(0, 255, 128)'
        });
    const [foxy, setFoxy] = useState(
        {
            name: 'foxy',
            src: './img/foxy.png',
            alt: 'Fox',
            id: 'foxy',
            position: 'lane5Out',
            sponsor: '',
            color: 'rgb(255, 81, 0)'
        });

//laneAnimationTime is used to prepare racers times to be used in JSX variable for animation-duration://
    const lane1AnimationTime = { animationDuration: lane1Time.time + 's'}
    const lane2AnimationTime = { animationDuration: lane2Time.time + 's'}
    const lane3AnimationTime = { animationDuration: lane3Time.time + 's'}
    const lane4AnimationTime = { animationDuration: lane4Time.time + 's'}
    const lane5AnimationTime = { animationDuration: lane5Time.time + 's'}

    
    
    const racePosition=()=>{window.scrollTo({top:0, left:0, behavior: 'smooth'})}
    useEffect(() => {
        racePosition();
    }, [])
    
    useLayoutEffect(() => {
        function updateSize() {
            setViewWidth(Math.min(window.visualViewport.width, document.documentElement.clientWidth, window.innerWidth));
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    
//when start is clicked, triggers useEffects to countdown and start race.//
    const handleGo = (e) => {
        e.target.id = 'go';
        setGo('MARK');
        setFollow('follow')
    }
    useEffect(() => {
        if(go === 'MARK') {
            setResultScreen('set');
            if(viewWidth <= 640){document.querySelector('#follow').style.setProperty('--tracking',viewWidth - 1270 + 'px');}
            else if(viewWidth < 1400){document.querySelector('#follow').style.setProperty('--tracking',viewWidth - 1448 + 'px');}
            const markSet = setTimeout(() =>
            setGo('SET'),1300)
            return() => clearTimeout(markSet);
       }},[go, resultScreen, viewWidth])

//setting up results screen with winner or ties as well as their sponsored options//
    const raceResults = () => {
//rounder uses multiply 8 rather than 10 cause each racers moving animation crosses finish line at 80% of animation duration//
        let rounder = (num) => { return Math.round(num * 8)/10}
        let lane1 = ['pup', rounder(lane1Time.time),pup.sponsor, pup.id, pup.color];
        let lane2 = ['dan', rounder(lane2Time.time),dan.sponsor, dan.id, dan.color];
        let lane3 = ['honey', rounder(lane3Time.time),honey.sponsor, honey.id, honey.color];
        let lane4 = ['golden', rounder(lane4Time.time),golden.sponsor, golden.id, golden.color];
        let lane5 = ['foxy', rounder(lane5Time.time),foxy.sponsor, foxy.id, foxy.color];
        let firstLast = [['No Racers', 11,'No Sponsor', {}],['No Racers', 3,'No Sponsor', {}]];
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
    const the2ndWinnerObj = () => {return raceResultsFinished.length > 2 ? raceResultsFinished[1][3] : null};
    const the2ndWinnerColor = () => {return raceResultsFinished.length > 2 ? raceResultsFinished[1][4] : null};
    const the2ndWinnerText = () => {return raceResultsFinished.length > 2 ? raceResultsFinished[1][2] : null};
    const the3rdWinner = () => {return raceResultsFinished.length > 3 ? raceResultsFinished[2][0] : null};
    const the3rdWinnerObj = () => {return raceResultsFinished.length > 3 ? raceResultsFinished[2][3] : null};
    const the3rdWinnerColor = () => {return raceResultsFinished.length > 3 ? raceResultsFinished[2][4] : null};
    const the3rdWinnerText = () => {return raceResultsFinished.length > 3 ? raceResultsFinished[2][2] : null};
    const theWinner = () => {return raceResultsFinished[0][0]};
    const theWinnerObj = () => {return raceResultsFinished[0][3]};
    const theWinnerColor = () => {return raceResultsFinished[0][4]};
    const theWinnerText = () => {return raceResultsFinished[0][2]};
    const winTitle = () => {return raceResultsFinished.length > 3 ? '3 WAY TIE!!!' : raceResultsFinished.length > 2 ? 'TIE!!!' : <font style={{color:theWinnerColor()}}>WINNER!!!</font>}
//starts race, gets racers moving, and page to follow racers from left to right//
// const viewWidth = Math.max(window.visualViewport.width || 0, document.documentElement.clientWidth || 0, window.innerWidth || 0)

    useEffect(() => {
        if(go ==='SET'){
        const markSetGo = setTimeout(() => {
            setGo('GO!');
            if(pup.position === 'lane1Set'){setPup({...pup, position:lane1Time.animation, id:'pupMove'})}
            if(dan.position === 'lane2Set'){setDan({...dan, position:lane2Time.animation, id:'danMove'})}
            if(honey.position === 'lane3Set'){setHoney({...honey, position:lane3Time.animation, id:'honeyMove'})}
            if(golden.position === 'lane4Set'){setGolden({...golden, position:lane4Time.animation, id:'goldenMove'})}
            if(foxy.position === 'lane5Set'){setFoxy({...foxy, position:lane5Time.animation, id:'foxyMove'})}
        },1300)
            return() => clearTimeout(markSetGo);
        }},[go, pup, dan, honey, golden, foxy, lane1Time.animation, lane2Time.animation, lane3Time.animation, lane4Time.animation, lane5Time.animation, viewWidth])

        const handleRematchClick = () =>{
            setFollow('');
            setResultScreen('off');
            setWinnerEnter('');
            document.querySelector('.go').id = 'start';
            const allRacerLanes = [document.getElementById('setLane1'), document.getElementById('setLane2'),
            document.getElementById('setLane3'), document.getElementById('setLane4'), document.getElementById('setLane5')]
            allRacerLanes.forEach((e) => {
                e.checked ? setupRacer(e.id) : removeRacer(e.id);
            });
        };
    const handleResetClick = () => window.location.reload();
//JSX for results screen displayed at end of race//
    const winResultsCover = (winnerDisplay) => { if (winnerDisplay=== 'on'){
        return(<div className='winnerCover' id='winnerCover' >
            <h1 className='winnerText' id='winnerText'>{winTitle()}</h1>
            <div className='winContainer' id={winnerEnter}>
                <div className={theWinner()+'Shadow'} id={theWinnerObj() +'Shadow'} ></div>
                <div className={the2ndWinner()+'Shadow'} id={the2ndWinnerObj() +'Shadow'} ></div>
                <div className={the3rdWinner()+'Shadow'} id={the3rdWinnerObj() +'Shadow'} ></div>
            </div>
            <div className='winContainer' id={winnerEnter}>
                <div className={theWinner()} id={theWinnerObj()} alt={theWinner()} ></div>
                <div className={the2ndWinner()} id={the2ndWinnerObj()} alt={the2ndWinner()} ></div>
                <div className={the3rdWinner()} id={the3rdWinnerObj()} alt={the2ndWinner()} ></div>
            </div>
            <h2 className='winnerSponsor' id='winnerSponsor' style={{color:theWinnerColor()}}>{theWinnerText()}</h2>
            <h2 className='winner2Sponsor' id='winner2Sponsor'style={{color:the2ndWinnerColor()}}>{the2ndWinnerText()}</h2>   
            <h2 className='winner3Sponsor' id='winner3Sponsor'style={{color:the3rdWinnerColor()}}>{the3rdWinnerText()}</h2> 
            <div className='winButtons' >
            <div className='reset' id='reset' onClick={handleResetClick}>RESTART</div>
            <div className='rematch' id='rematch' onClick={handleRematchClick}>REMATCH</div>
            </div>
            </div>
            )
        } if (winnerDisplay === 'set'){
        return  <div className='winnerCover' >
              <h1 className='winnerText' >{winTitle()}</h1>
              <h2 className='winnerSponsor' >{theWinnerText()}</h2>
              <h2 className='winner2Sponsor' >{the2ndWinnerText()}</h2>   
              <h2 className='winner3Sponsor' >{the3rdWinnerText()}</h2>
              <div className='winButtons' >
                <div className='reset' onClick={handleResetClick}>RESTART</div> |
                <div className='rematch' onClick={handleRematchClick}>REMATCH</div>
              </div>   
        </div>}
    <div></div>;}
    
//timing for when results screen starts and when it finishes and resets app//
    useEffect(() => {
        if(go ==='GO!'){
        const goResult = setTimeout(() => {   
            setGo('START')
            setResultScreen('on');
            setFollow('winCenter');
            setWinnerEnter('winnerEnter')
        },raceResultsFinished[raceResultsFinished.length -1][1] * 1000 + 1800)
        return() => clearTimeout(goResult);
        }},[go, resultScreen, raceResultsFinished, winnerEnter])
    
//racerVariable produces a degree of diviation from a racers average time of 9 seconds.
//racerPradictable is 9 seconds minus the average of racerVariable x(0.5) which is the average out come of Math.random.//
    const raceTimeMaker = (racerVariable,racerPradictable) => {return (Math.random()* racerVariable) + racerPradictable}

    const setupRacer = (setLane) => {
        switch(setLane) {
        case 'setLane1': { setPup({...pup,position:'lane1Set', id:'pupMove'})
        let lane1 = document.getElementById('lane1input')
        lane1.setAttribute('placeholder','enter sponsored option')
            let raceTime = raceTimeMaker(3,7.5);
            // let raceTime = raceTimeMaker(0,9);
            raceTime > 9.3 ? setLane1Time({time:raceTime, animation:'lane1Slow'})
            : raceTime < 8.8 ?setLane1Time({time:raceTime, animation:'lane1Fast'})
            : setLane1Time({time:raceTime, animation:'lane1Medium'});
        break;}
        case 'setLane2': { setDan({...dan,position:'lane2Set', id:'danMove'})
        let lane2 = document.getElementById('lane2input')
        lane2.setAttribute('placeholder','enter sponsored option')
            let raceTime = raceTimeMaker(2,7.95);
            // let raceTime = raceTimeMaker(0,9);
            raceTime > 9.3 ? setLane2Time({time:raceTime, animation:'lane2Slow'})
            : raceTime > 9 ?setLane2Time({time:raceTime, animation:'lane2Medium'})
            : raceTime > 8.6 ?setLane2Time({time:raceTime, animation:'lane2Fast'})
            : setLane2Time({time:raceTime, animation:'lane2Medium'});
        break;}
        case 'setLane3': { setHoney({...honey,position:'lane3Set', id:'honeyMove'})
            let lane3 = document.getElementById('lane3input')
            lane3.setAttribute('placeholder','enter sponsored option')
            let raceTime = raceTimeMaker(2.5,7.73);
            // let raceTime = raceTimeMaker(0,9);
            raceTime > 9.2 ? setLane3Time({time:raceTime, animation:'lane3Slow'})
            : raceTime < 8.8 ?setLane3Time({time:raceTime, animation:'lane3Fast'})
            : setLane3Time({time:raceTime, animation:'lane3Medium'});
        break;} 
        case 'setLane4': { setGolden({...golden,position:'lane4Set', id:'goldenMove'})
        let lane4 = document.getElementById('lane4input')
        lane4.setAttribute('placeholder','enter sponsored option')
            let raceTime = raceTimeMaker(3,7.5);
            // let raceTime = raceTimeMaker(0,9);
            raceTime > 9.2 ? setLane4Time({time:raceTime, animation:'lane4Slow'})
            : raceTime < 8.8 ?setLane4Time({time:raceTime, animation:'lane4Fast'})
            : setLane4Time({time:raceTime, animation:'lane4Medium'});
        break;}
        case 'setLane5': { setFoxy({...foxy,position:'lane5Set', id:'foxyMove'})
            let lane5 = document.getElementById('lane5input')
            lane5.setAttribute('placeholder','enter sponsored option')
            let raceTime = raceTimeMaker(2.5,7.73);
            // let raceTime = raceTimeMaker(0,9);
            raceTime > 9.2 ? setLane5Time({time:raceTime, animation:'lane5Slow'})
            : raceTime < 8.8 ?setLane5Time({time:raceTime, animation:'lane5Fast'})
            : setLane5Time({time:raceTime, animation:'lane5Medium'});
            break;}
            default:
            }}

//function used to remove racer from race when user unclicks racers name//
    const removeRacer = (setLane) => {
        window.scrollTo({top:0,left:0, behavior: 'smooth'});
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

const setupFocus = (e) => {let htmlfor = e.target.htmlFor; document.getElementById(htmlfor).checked ? document.getElementById(`lane${htmlfor[7]}input`).blur() : document.getElementById(`lane${htmlfor[7]}input`).focus();}

return (
<div className="container" id={follow}>
  <div className="inner-container">
    <div className="grid-container">
        <div className='titleShadow' >DECISION eRACER</div>
        <div className='title' >DECISION eRACER</div>
        <div className='goShadow' >{go}</div>
        <div className='go' onClick={handleGo}>{go}</div>

        <input type='checkbox' id='setLane1' onClick={(e)=> handleSetRacerClick(e)} />
        <label className='btnLane1' htmlFor='setLane1' onClick={(e)=> setupFocus(e)} >PUPSTAR</label>
        <form className='lane1input' 
            onSubmit={(e)=> handleSubmit(e)} onKeyDown={(e)=> {if(e.key === 'Enter'){ document.getElementById('lane1input').blur(); racePosition();}}}>
            <input id='lane1input' type='text' placeholder='' onChange={(e)=> setPup({...pup,sponsor:e.target.value})} />
        </form>
        <div className='lane1' id={pup.position} style={lane1AnimationTime} >
            <div className='pupShadow' id={pup.id+'Shadow'} ></div>
        </div>
        <div className='lane1' id={pup.position} style={lane1AnimationTime}>
            <label htmlFor='setLane1'><div className='pup' id={pup.id} alt={pup.alt}></div></label>
        </div>

        <input type='checkbox' id='setLane2' onClick={(e)=> handleSetRacerClick(e)} />
        <label className='btnLane2' htmlFor='setLane2' onClick={(e)=> setupFocus(e)} >SPEEDY</label>
        <form className='lane2input' 
            onSubmit={(e)=> handleSubmit(e)} onKeyDown={(e)=> {if(e.key === 'Enter'){ document.getElementById('lane2input').blur(); racePosition();}}}>
            <input id='lane2input' type='text' placeholder='' onChange={(e)=> setDan({...dan,sponsor:e.target.value})} />
        </form>
        <div className='lane2' id={dan.position} style={lane2AnimationTime}>
            <div className='danShadow' id={dan.id+'Shadow'} ></div>
        </div>
        <div className='lane2' id={dan.position} style={lane2AnimationTime}>
            <label htmlFor='setLane2'><div className='dan' id={dan.id} alt={dan.alt} ></div></label>
        </div>

        <input type='checkbox' id='setLane3' onClick={(e)=> handleSetRacerClick(e)} />
        <label className='btnLane3' htmlFor='setLane3' onClick={(e)=> setupFocus(e)} >B-LINE</label>
        <form className='lane3input' 
            onSubmit={(e)=> handleSubmit(e)} onKeyDown={(e)=> {if(e.key === 'Enter'){ document.getElementById('lane3input').blur(); racePosition();}}}>
            <input id='lane3input' type='text' placeholder='' onChange={(e)=> setHoney({...honey,sponsor:e.target.value})} />
        </form>
        <div className='lane3' id={honey.position} style={lane3AnimationTime}>
            <div className='honeyShadow' id={honey.id+'Shadow'} ></div>
        </div>
        <div className='lane3' id={honey.position} style={lane3AnimationTime}>
            <label htmlFor='setLane3'><div className='honey' id={honey.id} alt={honey.alt} ></div></label>
        </div>

        <input type='checkbox' id='setLane4' onClick={(e)=> handleSetRacerClick(e)} />
        <label className='btnLane4' htmlFor='setLane4' onClick={(e)=> setupFocus(e)} >SK8CUB</label>
        <form className='lane4input' 
            onSubmit={(e)=> handleSubmit(e)} onKeyDown={(e)=> {if(e.key === 'Enter'){ document.getElementById('lane4input').blur(); racePosition();}}}>
            <input id='lane4input' type='text' placeholder='' onChange={(e)=> setGolden({...golden,sponsor:e.target.value})} />
        </form>
        <div className='lane4' id={golden.position} style={lane4AnimationTime}>
            <div className='goldenShadow' id={golden.id + 'Shadow'} ></div>
        </div>
        <div className='lane4' id={golden.position} style={lane4AnimationTime}>
            <label htmlFor='setLane4'><div className='golden' id={golden.id} alt={golden.alt} ></div></label>
        </div>

        <input type='checkbox' id='setLane5' onClick={(e)=> handleSetRacerClick(e)} />
        <label className='btnLane5' htmlFor='setLane5' onClick={(e)=> setupFocus(e)} >FOXY</label>
        <form className='lane5input' 
            onSubmit={(e)=> handleSubmit(e)} onKeyDown={(e)=> {if(e.key === 'Enter'){ document.getElementById('lane5input').blur(); racePosition();}}}>
            <input id='lane5input' type='text' placeholder='' onChange={(e)=> setFoxy({...foxy,sponsor:e.target.value})} />
        </form>
        <div className='lane5' id={foxy.position} style={lane5AnimationTime}>
            <div className='foxyShadow' id={foxy.id+'Shadow'} alt={foxy.alt} ></div>
        </div>
        <div className='lane5' id={foxy.position} style={lane5AnimationTime}>
            <label htmlFor='setLane5'><div className='foxy' id={foxy.id} alt={foxy.alt} ></div></label>
        </div>
    </div>
  </div>
  {winResultsCover(resultScreen)}
</div>
);}

